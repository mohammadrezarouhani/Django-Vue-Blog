from django.core.management import BaseCommand
from django.contrib.auth import get_user_model
from faker import Faker
from faker.providers import internet
import random
from blog.models import Post

def generate_post_fake_data():
    faker=Faker()
    faker.add_provider(internet)
    all_users=get_user_model().objects.all()
    random_user=random.choice(all_users)
    
    fake_data={
        'user':random_user,
        'title':faker.name(),
        'summary':faker.text(max_nb_chars=114),
        'content':faker.text(),
        'image':faker.image_url(width=900, height=400)
    }
    return fake_data


class Command(BaseCommand):
    help = 'this command will create fake data fo post table as many as you want '

    def add_arguments(self, parser):
        parser.add_argument('number', type=int, help='The number of fake post that will be create')

    def handle(self, *args, **options):
        number = options['number']
        for i in range(number):
            data=generate_post_fake_data()
            Post.objects.create(**data)
        self.stdout.write(self.style.SUCCESS('Fake data generated successfully.'))