# Generated by Django 4.2.2 on 2023-07-02 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0003_rename_comment_comments_text'),
    ]

    operations = [
        migrations.AddField(
            model_name='comments',
            name='write_name',
            field=models.CharField(default='test', max_length=115),
            preserve_default=False,
        ),
    ]