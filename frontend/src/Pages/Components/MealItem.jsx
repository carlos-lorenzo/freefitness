import React from 'react'
import { useState, useEffect } from 'react';
export default function MealItem({ client, index }) {

    const [consumables, setConsumables] = useState([])

    if (consumables.length === 0){
        client.get(
            "/api/get_consumables",
            {withCredentials: true}
        ).then(function(response){
            setConsumables([...consumables, response.data[0]]);
            
        })
    }
    return (
		<>
			<select name={`name_${index}`} id="consumable">
					{consumables.map(consumable => {
						return (
							<option key={consumable.id} value={consumable.name}>{consumable.name}</option>
						)
					})}
			</select>
			<input name={`amount_${index}`} type="number" placeholder="amount"/>

		</>
        
    )
}
