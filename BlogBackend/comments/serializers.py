from rest_framework.serializers import ModelSerializer

from comments.models import Comments


class CommentSerializer(ModelSerializer):
    class Meta:
        fields = ['id', 'text', 'content_type', 'object_id']
        model = Comments
