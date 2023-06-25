from rest_framework.viewsets import ModelViewSet,GenericViewSet
from rest_framework.decorators import action
from .serializers import PostSerializer
from .models import Post
from .pagination import BlogPagination


class PostViewset(ModelViewSet):
    http_method_names = ['get']
    serializer_class = PostSerializer
    pagination_class = BlogPagination
    queryset = Post.objects.select_related('user').all()

