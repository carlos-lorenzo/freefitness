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
    
    let proteinColour = "#b12f2f";
    if (macros["protein"] >= macros["daily_protein"]){
        proteinColour = "#0a6161";
    }

    let caloriesColour = "#b12f2f";
    if (macros["protein"] >= macros["daily_protein"]){
        caloriesColour = "#0a6161";
    }
    
    let borderColour = "#b12f2f";
    if ((macros["protein"] >= macros["daily_protein"]) && (macros["protein"] >= macros["daily_protein"])) {
        borderColour = "#0a6161";
    }

    return (
        <span id='macro-info'>
            <h2>Today's Macros</h2>
        <div id='macros' className='border' style={{ borderColor: borderColour }}>
            <h4>Protein</h4>
            <PieChart
            data={[{ title:"protein", value: macros["protein"], color: proteinColour }]}
            totalValue={macros[`daily_protein`]}
            lineWidth={10}
            rounded={true}
            label={({ dataEntry }) => dataEntry.value + "g"}
            labelStyle={{
                fontSize: '15px',
                fontFamily: 'Monolisa',
                fill: proteinColour,
            }}
            labelPosition={0}
            />

            <h4>Calories</h4>
            <PieChart
            className='tracker-chart'
            data={[{ value: macros["calories"], color: caloriesColour }]}
            totalValue={macros[`daily_calories`]}
            lineWidth={10}
            rounded={true}
            label={({ dataEntry }) => dataEntry.value + "kcal"}
            labelStyle={{
                fontSize: '15px',
                fontFamily: 'Monolisa',
                fill: caloriesColour,
            }}
            labelPosition={0}
            />

        </div>
        </span>
        
    )
}
