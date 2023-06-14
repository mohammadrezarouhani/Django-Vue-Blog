from django.urls import path
from .views import PostViewset
from rest_framework_nested.routers import NestedDefaultRouter, DefaultRouter

router = DefaultRouter()
router.register('post', PostViewset, basename='post')
urlpatterns = router.urls
