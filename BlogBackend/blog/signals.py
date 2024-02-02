from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.hashers import make_password
from blog.models import Profile


@receiver(post_save, sender=get_user_model())
def on_profile_save(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        instance.save()
