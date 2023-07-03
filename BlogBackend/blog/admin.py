from django.contrib import admin
from django.contrib.admin import ModelAdmin
from .models import Profile, Post


@admin.register(Profile)
class ProfileAdmin(ModelAdmin):
    list_display = ['user', 'image']

admin.site.register(Post)
