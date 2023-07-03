from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import serializers
from .models import Post, Profile


class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    date = serializers.DateTimeField(source='create_at', format='%d %B, %Y', read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'title', 'username', 'summary', 'content', 'image', 'date']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['id', 'user', 'phone_number', 'summary', 'image']
        model = Profile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['phone_number', 'summary', 'image']
        model = Profile


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']
