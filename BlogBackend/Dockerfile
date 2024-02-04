FROM python:3.9-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN pip3 install --upgrade pip

RUN pip3 install PyYAML

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


COPY . .
RUN chmod u+x entrypoint.sh

EXPOSE 8000