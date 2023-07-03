from rest_framework.serializers import ModelSerializer

from blog.models import Post
from comments.models import Comments
from comments.serializers import CommentSerializer


class PostCommentSerializer(ModelSerializer):
    class Meta:
        fields = ['id', 'writer_name', 'writer_email', 'text']
        model = Comments

    def create(self, validated_data):
        comment = Comments.objects.create_comment(Post, self.context['post_pk'], **validated_data)
        return comment
