import React from 'react'
import { useState, useEffect } from 'react';
import MealItem from './MealItem';


import uuid from "react-native-uuid";

export default function CreateMeal({ client, setKey}) {

    
    
    const [consumables, setConsumables] = useState([])

    if (consumables.length === 0){
        client.get(
            "/api/get_consumables",
            {withCredentials: true}
        ).then(function(response){
            setConsumables([...consumables, ...response.data]);
            
        })
    }

    const [mealItems, setMealItems] = useState([{index: 0, amount: "", consumable: ""}]);

	function handleMealCreation(e) {
		e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

		client.post(
			"/api/create_meal",
            formData,
			{withCredentials: true},
            
            
		).then(function(response){
            setKey(Math.random());
		})
	}

    function addItem() {
       
        setMealItems([
            ...mealItems,
            {index: (mealItems[mealItems.length - 1]["index"] + 1), amount: "", consumable: ""}
            
        ]);
    }

    function removeItem() {
        if (mealItems.length > 1){
            setMealItems([
                ...mealItems.slice(0, -1),
            ]);
        } else {
            setMealItems([{index: 0, amount: "", consumable: ""}]);
        }
        
    }


    return (
        <>
            
        <form onSubmit={handleMealCreation} id="meal-form">
            {mealItems.map(item => {    
                return (
                    <MealItem 
                    key={uuid.v4()} 
                    client={client} 
                    index={item["index"]} 
                    consumables={consumables} 
                    currentConsumable={item["consumable"]}
                    amount={item["amount"]}
                    mealItems={mealItems}
                    setMealItems={setMealItems}/>
                )
                })}

            <div id='meal-options'>
                <button className="border" onClick={addItem}><h4>Add item</h4></button>
                <button className="border negative" onClick={removeItem}><h4>Remove item</h4></button>
            </div>
            
            <button className="border positive" type='submit'><h4>Create Meal</h4></button>
            

		</form>
        </>
        
    )
}
