from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from services.misc import PermissionsMixin

# Create your views here.
class BookingView(ListCreateAPIView):
    """ view for handling views """
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        """ list view for getting all views """
        user = request.user
