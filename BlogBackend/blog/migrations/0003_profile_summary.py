# Generated by Django 4.2.2 on 2023-07-01 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_alter_post_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='summary',
            field=models.TextField(default='summary for users'),
            preserve_default=False,
        ),
    ]