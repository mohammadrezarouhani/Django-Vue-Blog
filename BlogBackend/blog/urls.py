from django.urls import path
from .views import PostViewset, ProfileViewset
from rest_framework_nested.routers import NestedDefaultRouter, DefaultRouter

router = DefaultRouter()
router.register('post', PostViewset, basename='post')

router.register('profile', ProfileViewset,basename='profile')
urlpatterns = router.urls
