from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from blog.views import PostViewset
from blog_custom.views import PostCommentViewset

router = DefaultRouter()
router.register('post', PostViewset, basename='post')

post_nested = NestedDefaultRouter(router, 'post', lookup='post')
post_nested.register('comments', PostCommentViewset)

urlpatterns = post_nested.urls
