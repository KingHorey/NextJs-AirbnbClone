from django.db import models

# Create your models here.
class Message(models.Model):
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)
    content = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.content[:10]} - {self.user.email}"

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=['user'])
        ]