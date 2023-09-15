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
        
    

    return (
        <div id='macros' className='border'>
            <PieChart
            data={[{ title:"protein", value: macros["protein"], color: '#b12f2f' }]}
            totalValue={macros[`daily_protein`]}
            lineWidth={10}
            rounded={true}
            label={({ dataEntry }) => dataEntry.value + "g"}
            labelStyle={{
                fontSize: '15px',
                fontFamily: 'Monolisa',
                fill: '#b12f2f',
            }}
            labelPosition={0}
            />

            <PieChart
            className='tracker-chart'
            data={[{ value: macros["calories"], color: '#b12f2f' }]}
            totalValue={macros[`daily_calories`]}
            lineWidth={10}
            rounded={true}
            label={({ dataEntry }) => dataEntry.value + "kcal"}
            labelStyle={{
                fontSize: '15px',
                fontFamily: 'Monolisa',
                fill: '#b12f2f',
            }}
            labelPosition={0}
            />

        </div>
    )
}
