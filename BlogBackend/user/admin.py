from django.contrib import admin
from django.contrib.admin import ModelAdmin
from .models import BaseUser


@admin.register(BaseUser)
class BaseUserAdmin(ModelAdmin):
    list_display = ['username', 'email', 'fullname']
    fields = ['username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'password']
    search_fields = ['username']

    def fullname(self, instance):
        return instance.first_name + ' ' + instance.last_name
