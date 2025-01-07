from rest_framework.permissions import IsAuthenticated


class PermissionsMixin:
    permission_classes = [IsAuthenticated]