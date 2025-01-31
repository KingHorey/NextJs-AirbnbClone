import random
import string
import hmac
import hashlib

from typing import Any, Tuple, Union

from rest_framework.generics import CreateAPIView, get_object_or_404, UpdateAPIView
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.utils.decorators import method_decorator

from .models import Payment
from .serializers import CreatePaymentIntentSerializer
from booking.models import Booking


class CreatPaymentIntentView(CreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = CreatePaymentIntentSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        payment_status, payment_info = self.get_details()
        if payment_status == 'error':
            return Response({'data':
                             payment_info
                             }, status=status.HTTP_400_BAD_REQUEST)
        payment_reference = self._generate_payment_reference()
        serializer = self.get_serializer(data=payment_info)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['payment_reference'] = payment_reference
        serializer.save()
        return Response({
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)

    def get_details(self) -> Tuple[str, dict[Any, Any]]:
        """
        _summary_
            This method returns the details of a payment instance.

        _description_
            This methods extracts and returns the relevant details of a payment instance.

            i.e. booking_instance, amount,
            payment_reference, user

        _returns_
            Tuple[str, dict[Any, Any]]: A tuple containing a string and a dictionary
        """
        copied_data = self.request.data.copy()
        booking = copied_data.get('booking', None)
        if booking is None:
            return (
                'error', {
                    'error': 'Booking is required'
                })
        booking_instance = get_object_or_404(Booking, id=booking)
        # return error if booking is not confirmed
        if booking_instance.status != 'confirmed':
            return (
                'error', {
                    'error': 'Booking is not confirmed'
                })
        amount = booking_instance.total_price
        return ('success', {
            'booking': booking,
            'amount': amount,
            'user': self.request.user.id
        })

    def _generate_payment_reference(self) -> str:
        """
        _summary_
            This method generates a payment reference.

        _description_
            This method generates a payment reference using a combination of uppercase letters and digits.

        _returns_
            str: A string of 15 characters.
        """
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=15))


@method_decorator(csrf_exempt, name='dispatch')
class PaymentWebhookView(UpdateAPIView):
    """_summary_
    view to handle payment webhooks

    Args:
        CreateAPIView (_type_): _description_

    """
    serializer_class = CreatePaymentIntentSerializer
    queryset = Payment.objects.all()

    def post(self, request, *args, **kwargs):
        headers = self.request.headers
        payment_signature = headers.get('x-paystack-signature', None)
        if payment_signature is None:
            return Response({'error': 'Payment signature is required'}, status=status.HTTP_400_BAD_REQUEST)
        payload = request.body
        secret_key = settings.PAYSTACK_SECRET_KEY

        # verify the payment signature
        dig = hmac.new(bytes(secret_key, 'utf-8'),
                       payload, hashlib.sha512).hexdigest()
        if dig != payment_signature:
            return Response({'error': 'Invalid payment signature'}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.get('data', None)
        status, is_verified = self.check_payment_status(data)
        if not is_verified:
            return Response({'error': 'Payment status could not be verified'}, status=status.HTTP_400_BAD_REQUEST)

        # get payment instance and pass to serializer
        payment_instance = self._get_payment_instance(data)
        serializer = self.get_serializer(
            payment_instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'data': serializer.data
        }, status=status.HTTP_200_OK)

    def check_payment_status(self, payload: dict) -> Tuple[str, bool]:
        """
        _summary_
            This method checks the status of a payment.

        _description_
            This method checks the status of a payment using the payment reference.

        _returns_
            bool: A boolean value indicating the status of the payment.
        """
        status = payload.get('event', None)
        match status:
            case 'charge.success':
                # success, true
                return ('Success', self._verify_payment_info(payload))
            case 'charge.failed':
                return ('Failed', self._verify_payment_info(payload))
            case _:
                return ('Unknown', False)

    def _verify_payment_info(self, data: dict[Any, Any]):
        """
        verify payment information

        Args:
            data (dict[Any, Any]): payment payload data from paystack
        """
        payment_ref = data.get('reference', None)
        amount = data.get('amount', None)
        if payment_ref is None or amount is None:
            return False
        try:
            payment_instance = Payment.objects.get(
                payment_reference=payment_ref, amount=amount)
            if payment_instance is None or amount != payment_instance.amount:
                return False
            elif payment_instance.status == 'success':  # means payment has already been verified
                return False
        except Payment.DoesNotExist:
            return False
        return True

    def _get_payment_instance(self, data: dict[Any, Any]):
        """
        Fetches the payment instance to be updated.
        """
        payment_ref = data.get('reference')
        try:
            return Payment.objects.get(payment_reference=payment_ref)
        except Payment.DoesNotExist:
            return None
