from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from blog.views import PostViewset
from blog_custom.views import PostCommentViewset

post_router = DefaultRouter()
post_router.register('post', PostViewset, basename='posts')

comment_router=DefaultRouter()
comment_router.register('comments', PostCommentViewset, basename='comments')

post_nested = NestedDefaultRouter(post_router, 'post', lookup='post')
post_nested.register('comments', PostCommentViewset)

urlpatterns = post_nested.urls + comment_router.urls
