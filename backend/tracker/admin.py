from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Tracker)
admin.site.register(models.Consumable)
admin.site.register(models.Meal)