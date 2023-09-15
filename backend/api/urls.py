from django.urls import path
from . import views


urlpatterns = [
	path("", views.index),
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
	path('create_meal', views.CreateMeal.as_view(), name='createmeal'),
	path('get_meals', views.GetUserMeals.as_view(), name='getmeals'),
	path('get_consumables', views.GetConsumables.as_view(), name='getconsumables'),
    path('track', views.Track.as_view(), name='track'),
    path('update_state', views.UpdateUserState.as_view(), name='updatestate'),
    path('update_height', views.UpdateUserHeight.as_view(), name='updateheight'),
]