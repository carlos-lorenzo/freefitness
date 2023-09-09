from django.shortcuts import render
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from users.serialisers import UserRegisterSerialiser, UserLoginSerialiser, UserSerialiser
from rest_framework import permissions, status
from users.validations import custom_validation, validate_email, validate_password

from tracker.models import Tracker, Meal, Consumable, MealItem
from tracker.serializers import MealSerialiser, ConsumableSerialiser

# Create your views here.
def index(request):
	return render(request, "index.html", {})

class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serialiser = UserRegisterSerialiser(data=clean_data)
		if serialiser.is_valid(raise_exception=True):
			user = serialiser.create(clean_data)
			if user:
				user_tracker = Tracker.objects.create(user=user)
				user_tracker.save()
				return Response(serialiser.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
 
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serialiser = UserLoginSerialiser(data=data)
		if serialiser.is_valid(raise_exception=True):
			user = serialiser.check_user(data)
			login(request, user)
			return Response(serialiser.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	
	def get(self, request):
		serialiser = UserSerialiser(request.user)
		return Response({'user': serialiser.data}, status=status.HTTP_200_OK)

class CreateMeal(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	
	def post(self, request):
		

		user = request.user
		new_meal = Meal.objects.create(user=user)
		new_meal.save()
  
		meal_items = dict(request.POST.items())
		print(meal_items)

		for i in range(len(meal_items) // 2):
			consumable_name = meal_items[f"name_{i}"]
			amount = meal_items[f"amount_{i}"]
			consumable = Consumable.objects.all().get(name=consumable_name)
			
			meal_item = MealItem.objects.create(consumable=consumable,
												meal=new_meal,
                                       			amount=amount)
			meal_item.save()

		
  
		return Response(status=status.HTTP_200_OK)
	
class GetUserMeals(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	
	def get(self, request):
		user = request.user
		user_meals = Meal.objects.filter(user=user)
		serialiser = MealSerialiser(data=user_meals, many=True)
		
		return Response(serialiser.data, status=status.HTTP_200_OK)
		
class GetConsumables(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	
	def get(self, request):
		consumbales = Consumable.objects.all()
		serialiser = ConsumableSerialiser(consumbales, many=True)
		
		return Response(serialiser.data, status=status.HTTP_200_OK)
		