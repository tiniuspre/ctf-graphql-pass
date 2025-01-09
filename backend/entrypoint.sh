#!/bin/sh

set -e

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create default user
python manage.py create_default_user

# Execute the command passed as arguments
exec "$@"
