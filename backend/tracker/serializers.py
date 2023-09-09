from rest_framework import serializers

from .models import Meal, Consumable

class MealSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = "__all__"
        
class ConsumableSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Consumable
        fields = "__all__"