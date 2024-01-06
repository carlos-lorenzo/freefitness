from django.http import HttpRequest
from django.http import JsonResponse
from django.middleware.csrf import get_token

import datetime
import logging
import json

from django.shortcuts import render
from django.contrib.auth import login, logout
from django.core.exceptions import ValidationError
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from users.serialisers import UserRegisterSerialiser, UserLoginSerialiser, UserSerialiser
from rest_framework import permissions, status
from users.validations import custom_validation, validate_email, validate_password

from tracker.models import Tracker, Meal, Consumable, MealItem
from tracker.serializers import MealSerialiser, ConsumableSerialiser, TrackerSerialiser

# Create your views here.
def index(request):
	return render(request, "index.html", {})

class GetCSRFToken(APIView):
	permission_classes = (permissions.AllowAny,)
	
	def get(self, request: HttpRequest) -> Response:
		"""
		API index endpoint, check whether it is online.

		Args:
			request (HttpRequest): Nothing.

		Returns:
			Response: Response containing JSON with key "status".
		"""
		csrf_token = get_token(request)
		return JsonResponse({'csrfToken': csrf_token})


class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
 
	def post(self, request):
		
		serialiser = UserRegisterSerialiser(data=json.loads(request.data.get("_content", request.data)))
  
		if serialiser.is_valid(raise_exception=True):
			user = serialiser.create(json.loads(request.data.get("_content", request.data)))
			if user:
				user_tracker = Tracker.objects.create(user=user)
				user_tracker.save()
				return Response(serialiser.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        serializer = UserLoginSerialiser(data=json.loads(request.data.get("_content", request.data)))

        if serializer.is_valid():
            validated_data = serializer.validated_data
            # Perform authentication/login logic with validated_data
            
            # Example: Assuming you have a 'check_user' method in your serializer
            user = serializer.check_user(validated_data)
            login(request, user)
            # Perform further authentication/logic, e.g., using Django's login method
            
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	


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
		

class Track(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	
	def get(self, request):
		user = request.user
		tracker = Tracker.objects.all().get(user=user)
		tracker.reset_macros()
  
		today = datetime.date.today() # date representing today's date
		
		meals = Meal.objects.filter(user=user).filter(consumed_at=today)
		
		for meal in meals:
			meal_items = MealItem.objects.all().filter(meal=meal)
			for meal_item in meal_items:
				tracker.add_to_macros(meal_item.macros)

		tracker.round_macros()
		
		serialiser = TrackerSerialiser(tracker, many=False)
		
		tracker_data = dict(serialiser.data)
		tracker_data["daily_protein"] = tracker.daily_protein
		tracker_data["daily_calories"] = tracker.maintenance_calories
		tracker_data["state"] = user.state
		return Response(tracker_data, status=status.HTTP_200_OK)
		
  
	
class UpdateUserState(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	
	def post(self, request):
		user = request.user
		# Get the state from the request data
		new_state = json.loads(request.data.get("_content", request.data)).get("state")
		
		if new_state is not None:
			# Update the user's state
			user.state = new_state
			user.save()
			
			return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
		else:
			return Response({"message": "Invalid value in the request"}, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserActivity(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	
	def post(self, request):
		user = request.user
		# Get the state from the request data
		new_activity = json.loads(request.data.get("_content", request.data)).get("activity")
		
		if new_activity is not None:
			# Update the user's state
			user.activity = new_activity
			user.save()
			
			return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
		else:
			return Response({"message": "Invalid value in the request"}, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserSex(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	
	def post(self, request):
		user = request.user
		# Get the sex from the request data 
		sex = json.loads(request.data.get("_content", request.data)).get("sex")
		
		if sex is not None:
			# Update the user's sex
			user.sex = sex
			user.save()
			
			return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
		else:
			return Response({"message": "Invalid value in the request"}, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserHeight(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	
	def post(self, request):
		user = request.user
		
		# Get the height from the request data 
		new_height = json.loads(request.data.get("_content", request.data)).get("height")
		
		if new_height is not None:
			# Update the user's height
			user.height = new_height
			user.save()
			
			return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
		else:
			return Response({"message": "Invalid value in the request"}, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserWeight(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	
	def post(self, request):
		user = request.user
		
		# Get the weight from the request data 
  
		new_weight = json.loads(request.data.get("_content", request.data)).get("weight")
		
		if new_weight is not None:
			# Update the user's weight
			user.weight = new_weight
			user.save()
			
			return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
		else:
			return Response({"message": "Invalid value in the request"}, status=status.HTTP_400_BAD_REQUEST)