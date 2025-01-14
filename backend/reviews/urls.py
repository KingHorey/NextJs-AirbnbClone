from django.urls import path

from reviews.views import CreateReview, ReviewActionsView

urlpatterns = [
    path("create/", CreateReview.as_view(), name="create review"),
    path("action/<uuid:id>", ReviewActionsView.as_view(), name="edit, update "
                                                             "and delete "
                                                             "review")
]