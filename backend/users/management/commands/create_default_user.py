# backend/myapp/management/commands/create_default_user.py

import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Creates a default user with the flag'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        username = 'admin'
        password = os.environ.get('ADMIN_PASSWORD', 'cheeseontoast')
        email = 'admin@login.no'
        secret_note = os.getenv('FLAG', 'Something went wrong. Contact CTFkom for the flag.')

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, email=email, password=password, secret_note=secret_note)
            self.stdout.write(self.style.SUCCESS(f'Successfully created user "{username}"'))
        else:
            self.stdout.write(self.style.WARNING(f'User "{username}" already exists'))
