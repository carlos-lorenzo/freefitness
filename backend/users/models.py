from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
	def create_user(self, email, password=None,  **extra_fields):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email, **extra_fields)
		user.set_password(password)
		user.save()
		return user
	def create_superuser(self, email, password=None, **extra_fields):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(email=email, password=password, **extra_fields)
		user.is_superuser = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	class Sex(models.IntegerChoices):
		MALE = 1
		FEMALE = 2
	
	class State(models.IntegerChoices):
		CUTTING = 1
		MAINTAINING =  2
		BULKING = 3
  
	
	class Activity(models.IntegerChoices):
		NO = 1
		LIGHT =  2
		MODERATE = 3
		VERY_ACTIVE = 4
		EXTRA_ACTIVTE = 5
 	
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	username = models.CharField(max_length=50)
	sex = models.IntegerField(Sex.choices, default=1)
	height = models.PositiveIntegerField(default=180)
	weight = models.PositiveIntegerField(default=65)
	age = models.PositiveIntegerField(default=16)
	state = models.IntegerField(State.choices, default=2)
	activity = models.IntegerField(Activity.choices, default=3)
 
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username'] #"sex", "height", "weight", "age"
	
	@property
	def is_staff(self):
		return self.is_superuser
 
	objects = AppUserManager()
	def __str__(self):
		return self.username