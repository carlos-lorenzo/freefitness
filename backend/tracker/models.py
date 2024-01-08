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
    
    @property
    def macros(self) -> dict[str, float]:
        return {
            "calories": round(self.calories, 2),
            "fat": round(self.fat, 2),
            "carbs": round(self.carbs, 2),
            "sugar": round(self.sugar, 2),
            "protein": round(self.protein, 2)
        }
    
    
    @property
    def maintenance_calories(self) -> float:
        if self.user.sex == 1: # Male
            BMR = 88.362 + (13.397 * self.user.weight) + (4.799 * self.user.height) - (5.677 * self.user.age) 
        
        elif self.user.sex == 2:
            BMR = 655.1 * (9.563 * self.user.weight) + (1.85 * self.user.height) - (4.676 * self.user.age)
        
        COEFFICIENTS = [1.2, 1.375, 1.55, 1.725, 1.9]
        STATE = [-300, 0, 300]
        
        return round((BMR * COEFFICIENTS[(self.user.activity - 1)]) + STATE[self.user.state - 1])
    
    @property
    def daily_protein(self) -> float:
        return self.user.weight * 2
        
          
    
    def add_to_macros(self, macros: dict) -> None:
        self.calories += macros["calories"]
        self.fat += macros["fat"]
        self.carbs+= macros["carbs"]
        self.sugar += macros["sugar"]
        self.protein += macros["protein"]
    
    def reset_macros(self) -> None:
        self.calories = 0
        self.fat = 0
        self.carbs = 0
        self.sugar = 0
        self.protein = 0
    
    def round_macros(self) -> None:
        self.calories = round(self.calories)
        self.fat = round(self.fat)
        self.carbs = round(self.carbs)
        self.sugar = round(self.sugar)
        self.protein = round(self.protein)
    
    

    
class Meal(models.Model):
    user = models.ForeignKey("users.AppUser", on_delete=models.CASCADE)
    consumed_at = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user}' meal at {self.consumed_at}"

class Consumable(models.Model):
    name = models.CharField(max_length=500)
    calories = models.FloatField(default=0)
    fat = models.FloatField(default=0)
    carbs = models.FloatField(default=0)
    sugar = models.FloatField(default=0)
    protein = models.FloatField(default=0)
    
    
    
    def __str__(self) -> str:
        return self.name

    
    @property
    def macros(self) -> dict:
        return {
            "calories": self.calories,
            "fat": self.fat,
            "carbs": self.carbs,
            "sugar": self.sugar,
            "protein": self.protein
        }

class MealItem(models.Model):
    consumable = models.ForeignKey("Consumable", on_delete=models.CASCADE)
    meal = models.ForeignKey("Meal", on_delete=models.CASCADE)
    amount = models.IntegerField(default=100)
    
    def __str__(self) -> str:
        return self.consumable.name
    
    @property
    def macros(self) -> dict:
    
        consumable_marcros = self.consumable.macros
              
        return {
            "calories": round((consumable_marcros["calories"] / 100) * self.amount, 2),
            "fat": round((consumable_marcros["fat"] / 100) * self.amount, 2),
            "carbs": round((consumable_marcros["carbs"] / 100) * self.amount, 2),
            "sugar": round((consumable_marcros["sugar"] / 100) * self.amount, 2),
            "protein": round((consumable_marcros["protein"] / 100) * self.amount, 2)
        }
    
