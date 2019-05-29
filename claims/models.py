from django.db import models


class Claim(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    birthday = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    area = models.TextField()
    knowledges = models.TextField()
    opendoors = models.BooleanField()
