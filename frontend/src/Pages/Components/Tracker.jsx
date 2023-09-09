import React from 'react'
import { useState } from 'react'


export default function Tracker({ client }) {

    const [macros, setMacros] = useState({})


    client.get(
        "/api/track",
        {withCredentials: true}
    ).then(function(response){
        setMacros(response.data);
        
    })
        
    

    return (
        <div id='macros'>
            <p>Calories: {macros["calories"]}g</p>
            <p>Fats: {macros["fat"]}g</p>
            <p>Carbs: {macros["carbs"]}g</p>
            <p>Sugar: {macros["sugar"]}g</p>
            <p>Protein: {macros["protein"]}g</p>
        </div>
    )
}
