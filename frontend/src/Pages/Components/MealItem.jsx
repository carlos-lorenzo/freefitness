import React from 'react'
import { useState, useRef } from 'react';
import ConsumableSearch from './ConsumableSearch';


export default function MealItem({ client, index, consumables }) {

    
    return (
		<div className='meal-item'>
			<input name={`amount_${index}`} type="number" placeholder="grams"/>

			<ConsumableSearch consumables={consumables} index={index}/>

		</div>
        
    )
}
