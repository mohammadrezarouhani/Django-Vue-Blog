# Generated by Django 4.2.2 on 2023-07-02 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0004_comments_write_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='comments',
            name='write_email',
            field=models.CharField(default='test', max_length=115),
            preserve_default=False,
        ),
    ]