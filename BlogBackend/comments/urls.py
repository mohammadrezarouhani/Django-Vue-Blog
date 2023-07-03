from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter

from comments.views import CommentViewset

router = DefaultRouter()
router.register('comment', CommentViewset, basename='comment')

urlpatterns = router.urls
