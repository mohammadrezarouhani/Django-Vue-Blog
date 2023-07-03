from django.conf import settings
from django.core.validators import RegexValidator
from django.db import models
from . import path_generator as paths


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    phone_regex = RegexValidator(regex=r'^(\+\d{1,3})?,?\s?\d{8,13}',
                                 message="Phone number must be entered in the format: '+999999999'. Up to 15 digits "
                                         "allowed.")
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    summary = models.TextField()
    address = models.TextField()
    image = models.ImageField(upload_to=paths.profile_image_upload)


class Post(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='post')
    title = models.CharField(max_length=115)
    summary = models.CharField(max_length=512)
    content = models.TextField()
    image = models.ImageField(upload_to=paths.post_image_upload)
    create_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(blank=True, null=True)
