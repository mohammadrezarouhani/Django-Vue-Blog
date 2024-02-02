from rest_framework import serializers

from blog.models import Post
from comments.models import Comments
from comments.serializers import CommentSerializer


class PostCommentSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ['id', 'writer_name', 'writer_email', 'text']
        model = Comments

    def create(self, validated_data):
        post_obj = Post.objects.get(pk=self.context['post_pk'])
        comment = Comments.objects.create_comment(Post, self.context['post_pk'], post_obj, **validated_data)
        return comment
#
