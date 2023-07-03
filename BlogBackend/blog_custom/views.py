from django.shortcuts import render

from blog.models import Post
from blog_custom.serializers import PostCommentSerializer
from comments.models import Comments
from comments.views import CommentViewset


class PostCommentViewset(CommentViewset):
    serializer_class = PostCommentSerializer

    def get_queryset(self):
        return Comments.objects.get_comments_for(Post, self.kwargs['post_pk'])

    def get_serializer_context(self):
        return {'post_pk': self.kwargs['post_pk']}
