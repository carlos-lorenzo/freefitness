import csv
import os
from tracker.models import Consumable # Import the Consumable model from your Django app

import django
from tqdm import tqdm

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "freefitness.settings")


# Configure Django settings
django.setup()

def import_consumables_from_csv():
    # Get the absolute path to the directory containing this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Construct the absolute path to the CSV file
    csv_file_path = os.path.join(script_dir, 'macros.csv')

    with open(csv_file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in tqdm(reader):
            macros = {
                "name": row['Name'],
                "calories": row['Calories'],
                "fat": row['Fat (g)'],
                "carbs": row['Carbohydrate (g)'],
                "sugar": row['Sugars (g)'],
                "protein": row['Protein (g)']}
                
            for key, value in macros.items():
                if key != "name":
                    try:
                        macros[key] = float(value)
                    
                    except ValueError:
                        macros[key] = 0
                    
            
            
            # Create a Consumable object for each row in the CSV
            consumable = Consumable(
                name=macros["name"],
                calories=macros["calories"],
                fat=macros["fat"],
                carbs=macros["carbs"],
                sugar=macros["sugar"],
                protein=macros["protein"]
            )
            consumable.save()  # Save the object to the database

# Call the function to import data from the CSV file
#import_consumables_from_csv()
