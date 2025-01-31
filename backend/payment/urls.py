from django.urls import path

from .views import CreatPaymentIntentView, PaymentWebhookView


urlpatterns = [
    path("initiate/", CreatPaymentIntentView.as_view(),
         name="initiate payment"),
    path("webhook/", PaymentWebhookView.as_view(),
         name="payment webhook"),
]
