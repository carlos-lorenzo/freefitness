import React from 'react'
import { useState, useEffect } from 'react'

import { PieChart } from 'react-minimal-pie-chart';

export default function Tracker({ client, key}) {

    const [macros, setMacros] = useState({})

    useEffect(() => {
        // Make the Axios request when the component is mounted
        client.get("/api/track", { withCredentials: true })
            .then(function (response) {
                setMacros(response.data);

            });

       
        return () => {
            
        };
    }, [key]);
    
    const protein = macros["protein"];
    const dailyProtein = macros["daily_protein"];
    const calories = macros["calories"];
    const dailyCalories = macros["daily_calories"];
    const state = macros["state"];

    let valueCalories = calories;

    const positiveColour = "#0a6161";
    const negativeColour = "#b12f2f";
    const neutralColour = "#e6b32f";

    let proteinColour = negativeColour;
    let caloriesColour = negativeColour;
    let borderColour = negativeColour;
    
    if (protein >= dailyProtein){
        proteinColour = positiveColour;
        borderColour = neutralColour;
    }


    if (state === 1) { // cutting

        valueCalories = dailyCalories - calories;

        if (calories <=dailyCalories) {
            caloriesColour = positiveColour;
            borderColour = neutralColour;
            
            if (proteinColour === positiveColour) {
                borderColour = positiveColour;
            }
        }
    } else if (state === 2) {
        if (Math.abs(dailyCalories - calories) <= 300){
            caloriesColour = positiveColour;
           
            if (proteinColour === positiveColour) {
                borderColour = positiveColour;
            }
        }
    } else if (state === 3) { // bulking
        if (calories >= dailyCalories) {
            caloriesColour = positiveColour;
            
            if (proteinColour === positiveColour) {
                borderColour = positiveColour;
            }
        }
    }
    

    return (
        <span id='macro-info'>
            <h2>Today's Macros</h2>
        <div id='macros' className='border' style={{ borderColor: borderColour }}>
            <h4>Protein</h4>
            <PieChart
            data={[{ title:"protein", value: protein, color: proteinColour }]}
            totalValue={dailyProtein}
            lineWidth={10}
            rounded={true}
            label={({ dataEntry }) => dataEntry.value + "g"}
            labelStyle={{
                fontSize: '15px',
                fontFamily: 'JetBrains Mono',
                fill: proteinColour,
            }}
            labelPosition={0}
            />

            <h4>Calories</h4>
            <PieChart
            className='tracker-chart'
            data={[{ title:"calories", value: valueCalories, color: caloriesColour }]}
            totalValue={dailyCalories}
            lineWidth={10}
            rounded={true}
            label={({ dataEntry }) => dataEntry.value + "kcal"}
            labelStyle={{
                fontSize: '15px',
                fontFamily: 'JetBrains Mono',
                fill: caloriesColour,
            }}
            labelPosition={0}
            />

        </div>
        </span>
        
    )
}
