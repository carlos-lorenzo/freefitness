import React, { useState, useEffect } from 'react';
import ConsumableSearch from './ConsumableSearch';

export default function MealItem({ client, index, consumables, amount, consumable, mealItems, setMealItems }) {
    const [currentAmount, setCurrentAmount] = useState(amount);

    
    
  useEffect(() => {
    const timeoutId = setTimeout(() => {
        if (currentAmount !== mealItems[index]["amount"]){
            setMealAmount();
        } 
        
        
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [currentAmount]);


    function setMealAmount() {
        let newMealItems = [...mealItems];
        newMealItems[index] = {
            index: index,
            amount: currentAmount,
            consumable: consumable,
        };

        setMealItems(newMealItems);
    }

    function handleAmountChange(e) {
        setCurrentAmount(e.target.value);
        
        
    };

    return (
        <div className='meal-item'>
            <input
                value={currentAmount}
                name={`amount_${index}`}
                type="number"
                placeholder="grams"
                onChange={handleAmountChange}
            />

            <ConsumableSearch consumables={consumables} index={index} consumable={consumable} />
        </div>
    );
}
