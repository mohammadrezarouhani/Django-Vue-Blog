from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
from .serializers import PostSerializer, ProfileSerializer
from .models import Post, Profile
from .pagination import BlogPagination


class PostViewset(ModelViewSet):
    serializer_class = PostSerializer
    pagination_class = BlogPagination
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["user"]
    search_fields = ["title", "summary", "content"]

    queryset = Post.objects.select_related("user").all()


class ProfileViewset(ModelViewSet):
    http_method_names = ["get", "put"]
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.get(pk=self.request.user.pk)

    @action(methods=["put", "get"], detail=False)
    def me(self, request):
        profile = get_object_or_404(Profile, user=request.user.id)

        if request.method == "GET":
            serializer = ProfileSerializer(profile)
        else:
            serializer = ProfileSerializer(profile, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response(serializer.data)
