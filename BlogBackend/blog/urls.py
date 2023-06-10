from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PostViewset

router=DefaultRouter()
router.register('post',PostViewset,basename='post')

urlpatterns=router.urls