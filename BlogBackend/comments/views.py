from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from comments.models import Comments
from comments.serializers import CommentSerializer


class CommentViewset(ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentSerializer
