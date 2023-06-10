from rest_framework.viewsets import ModelViewSet
from .serializers import PostSerializer
from .models import Post
from .pagination import BlogPagination

class PostViewset(ModelViewSet):
    serializer_class=PostSerializer
    pagination_class=BlogPagination
    queryset=Post.objects.all()
    
