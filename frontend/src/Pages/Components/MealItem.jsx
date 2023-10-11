import React, { useState, useEffect } from 'react';
import ConsumableSearch from './ConsumableSearch';

export default function MealItem({ client, index, consumables, amount, currentConsumable, mealItems, setMealItems }) {
    const [currentAmount, setCurrentAmount] = useState(amount);

    
    
  useEffect(() => {
    const timeoutId = setTimeout(() => {
        if (currentAmount !== mealItems[index]["amount"]){
            setMealItemsAmount();
        } 
        
        
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [currentAmount]);


    function setMealItemsAmount() {
        let newMealItems = [...mealItems];
        newMealItems[index] = {
            index: index,
            amount: currentAmount,
            consumable: currentConsumable,
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

            <ConsumableSearch 
            consumables={consumables} 
            index={index} 
            currentConsumable={currentConsumable}
            mealItems={mealItems}
            setMealItems={setMealItems}/>
        </div>
    );
}
