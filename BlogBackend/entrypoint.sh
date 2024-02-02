#!/bin/sh

# Run migrations
python manage.py migrate
echo "Migrated successfully"
python manage.py runserver 0.0.0.0:8000 