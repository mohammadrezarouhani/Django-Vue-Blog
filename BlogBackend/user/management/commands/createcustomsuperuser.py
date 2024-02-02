import pdb
from traceback import format_exc
from django.core.management.base import BaseCommand, CommandError
from user.models import BaseUser
from django.contrib.auth.hashers import make_password
from django.core.validators import validate_email
from django.db.utils import IntegrityError


class Command(BaseCommand):
    help = "create a custom super user"

    # if we use nargs='+' it get a list of variables
    def add_arguments(self, parser):
        parser.add_argument("--username", type=str)
        parser.add_argument("--email",  type=str)
        parser.add_argument("--password", type=str)

    def handle(self, *args, **options):
        username = options.get('username')
        if not username:
            raise CommandError('username should not be empty')

        email = options.get('email')
        if not email and not validate_email(email):
            raise CommandError(
                "email should not be empty and should be on proper form")

        password = options.get('password')

        if not password:
            raise CommandError('password should not be empty')

        try:
            res = BaseUser.objects.create(
                username=username, email=email, password=password, is_staff=True, is_active=True, is_superuser=True)

            self.stdout.write('user created successfully')

        except IntegrityError as error:
            if 'username' in str(error):
                raise CommandError(
                    f'a user with username << {username} >> already exist')
            elif 'email' in str(error):
                raise CommandError(
                    f'a user with email << {email} >> already exist')
            else:
                format_exc()
        except Exception as error:
            self.stdout.write(format_exc())
