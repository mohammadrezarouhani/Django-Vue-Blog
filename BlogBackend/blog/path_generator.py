import pdb
from datetime import datetime as dt
from pathlib import Path


def profile_image_upload(instance,path):
    date=dt.now()
    date=dt.strftime(date,'%Y-%m-%d')
    return Path('profile')/date/path


def post_image_upload(instance,path):
    date=dt.now()
    date=dt.strftime(date,'%Y-%m-%d')
    return Path('post')/date/path