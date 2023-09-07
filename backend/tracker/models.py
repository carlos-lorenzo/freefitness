from django.db import models

# Create your models here.
class Tracker(models.Model):
    user = models.ForeignKey("users.AppUser", on_delete=models.CASCADE)
    calories = models.FloatField(default=0, blank=True)
    fat = models.FloatField(default=0, blank=True)
    carbs = models.FloatField(default=0, blank=True)
    sugar = models.FloatField(default=0, blank=True)
    protein = models.FloatField(default=0, blank=True)
    
    def __str__(self) -> str:
        return f"{self.user.username}' tracker"
    

class Consumable(models.Model):
    name = models.CharField(max_length=100)
    calories = models.FloatField(default=0)
    fat = models.FloatField(default=0)
    carbs = models.FloatField(default=0)
    sugar = models.FloatField(default=0)
    protein = models.FloatField(default=0)
    
    def __str__(self) -> str:
        return self.name
