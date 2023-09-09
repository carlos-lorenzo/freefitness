from rest_framework import serializers

from .models import Meal, Consumable, Tracker

class MealSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = "__all__"
        
class ConsumableSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Consumable
        fields = "__all__"
        

class TrackerSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Tracker
        fields = "__all__"