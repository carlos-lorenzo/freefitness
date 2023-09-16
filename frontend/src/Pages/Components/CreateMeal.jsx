import React from 'react'
import { useState, useEffect } from 'react';
import MealItem from './MealItem';
import uuid from "react-native-uuid";

export default function CreateMeal({ client, setKey}) {

    const [items, setItems] = useState([0]);
    
    
    const [consumables, setConsumables] = useState([])

    if (consumables.length === 0){
        client.get(
            "/api/get_consumables",
            {withCredentials: true}
        ).then(function(response){
            setConsumables([...consumables, ...response.data]);
            
        })
    }

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
        setItems([
            ...items,
            items[items.length - 1] + 1
        ]);
    }

    function removeItem() {
        if (items.length > 1){
            setItems([
                ...items.slice(0, -1),
            ]);
        }
        
    }


    return (
        <>
            
        <form onSubmit={handleMealCreation} id="meal-form">
            <p>Add as many items as you want before anything. It will reset when adding an item. I will fix it... sometime...</p>
            {items.map(item => {
                return (
                    <MealItem key={uuid.v4()} client={client} index={item} consumables={consumables}/>
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
