#!/bin/sh

python manage.py migrate
python manage.py createcustomsuperuser --username admin --email admin@admin.com --password admin
python manage.py runserver 0.0.0.0:8000