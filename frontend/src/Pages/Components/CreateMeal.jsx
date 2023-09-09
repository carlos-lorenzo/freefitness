import React from 'react'
import { useState, useEffect } from 'react';
import MealItem from './MealItem';
import uuid from "react-native-uuid";

export default function CreateMeal({ client }) {

    const [items, setItems] = useState([0]);
    
    
	function handleMealCreation(e) {
		e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

		client.post(
			"/api/create_meal",
            formData,
			{withCredentials: true},
            
            
		).then(function(response){
            setItems([0])
		})
	}

    function addItem() {
        setItems([
            ...items,
            items[items.length - 1] + 1
        ]);
    }


    return (
        <>
        <form onSubmit={handleMealCreation} id="meal-form">
            {items.map(item => {
                return (
                    <MealItem key={uuid.v4()} client={client} index={item}/>
                )
                })}
            <button onClick={addItem}><h4>Add item</h4></button>
			<button type='submit'><h4>Create Meal</h4></button>
		</form>
        </>
        
    )
}
