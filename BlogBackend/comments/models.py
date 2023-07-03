from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.db import models


class Date:
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField()


class CommentsManager(models.Manager):
    def create_comment(self, obj_type, obj_id, **data):
        content_type = ContentType.objects.get_for_model(obj_type)
        comment = Comments.objects.create(content_type=content_type, object_id=obj_id, **data)
        return comment

    def get_comments_for(self, obj_type, obj_id):
        content_type = ContentType.objects.get_for_model(obj_type)
        comment = Comments.objects.filter(content_type=content_type, object_id=obj_id)
        return comment


class Comments(models.Model):
    objects = CommentsManager()
    text = models.TextField()
    writer_name = models.CharField(max_length=115)
    writer_email = models.CharField(max_length=115)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.IntegerField()
    content_object = GenericForeignKey()
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)

    class Meta:
        ordering = ['-create_at']
