from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    date = serializers.DateTimeField(source='create_at', format='%d %B, %Y', read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'title', 'username', 'summary', 'content', 'image', 'date']
