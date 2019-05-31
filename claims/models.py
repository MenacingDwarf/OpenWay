from django.db import models
from django.contrib.auth.models import User


class Claim(models.Model):
    sender = models.ForeignKey('UserStudent', models.CASCADE, default=1)
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    birthday = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    area = models.TextField()
    knowledges = models.TextField()
    opendoors = models.BooleanField()
    accepted_admin = models.ForeignKey('UserAdmin', models.SET_DEFAULT, blank=True, default=None, null=True)

    def __str__(self):
        return self.name + ' ' + self.surname


class UserAdmin(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    answer = models.TextField(blank=True)
    task = models.CharField(max_length=150, blank=True)


class UserStudent(models.Model):
    user = models.ForeignKey(User, models.CASCADE)
    name = models.CharField(max_length=100, blank=True)
    surname = models.CharField(max_length=100, blank=True)
    email = models.CharField(max_length=100, blank=True)
    birthday = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=100, blank=True)
