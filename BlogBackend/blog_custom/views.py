import pdb

from django.db.models import Count
from django.shortcuts import render
from rest_framework.response import Response

from blog.models import Post
from blog_custom.serializers import PostCommentSerializer
from comments.models import Comments
from comments.views import CommentViewset
from user.models import BaseUser


class PostCommentViewset(CommentViewset):
    serializer_class = PostCommentSerializer

    def get_queryset(self):
        post_pk = self.kwargs.get('post_pk')
        comments = Comments.objects
        comment_user = self.request.query_params.get('user_comments')
        user = self.request.user

        if post_pk:
            comments = comments.get_comments_for(Post, post_pk)

        if comment_user and user:
            posts_id = BaseUser.objects.values('post__id').filter(pk=user.id)
            comments = comments.filter(object_id__in=posts_id)
        return comments

    def get_serializer_context(self):
        return {'post_pk': self.kwargs.get('post_pk')}

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        obj_count = queryset.count()
        serializer = self.get_serializer(queryset[0:4], many=True)

        return Response({
            'count': obj_count,
            'results': serializer.data
        })
