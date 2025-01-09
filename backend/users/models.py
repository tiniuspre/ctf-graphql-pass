from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):

    email = models.EmailField(blank=False, max_length=254, verbose_name="email address")
    secret_note = models.CharField(blank=True, max_length=254, default='No secret', verbose_name="secret note")

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"
