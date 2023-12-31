from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
	path("", views.index),
    path("get_csrf_token", views.GetCSRFToken.as_view(), name="csrftoken"),
    path('api-token-auth', obtain_auth_token, name='api_token_auth'),
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
	path('create_meal', views.CreateMeal.as_view(), name='createmeal'),
	path('get_meals', views.GetUserMeals.as_view(), name='getmeals'),
	path('get_consumables', views.GetConsumables.as_view(), name='getconsumables'),
	path('track', views.Track.as_view(), name='track'),
    path('update_activity', views.UpdateUserActivity.as_view(), name='updateactivity'),
	path('update_state', views.UpdateUserState.as_view(), name='updatestate'),
    path('update_sex', views.UpdateUserSex.as_view(), name='updatesex'),
	path('update_height', views.UpdateUserHeight.as_view(), name='updateheight'),
	path('update_weight', views.UpdateUserWeight.as_view(), name='updateweight'),
]