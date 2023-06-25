from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Post,Profile


class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    date = serializers.DateTimeField(source='create_at', format='%d %B, %Y', read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'title', 'username', 'summary', 'content', 'image', 'date']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['id', 'phone_number', 'image']
        model=Profile

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']

