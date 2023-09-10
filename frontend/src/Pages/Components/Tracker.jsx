import React from 'react'
import { useState, useEffect } from 'react'


export default function Tracker({ client, key}) {

    const [macros, setMacros] = useState({})


    useEffect(() => {
        // Make the Axios request when the component is mounted
        client.get("/api/track", { withCredentials: true })
            .then(function (response) {
                setMacros(response.data);
            });

        // You can also return a cleanup function if needed
        return () => {
            // Perform cleanup tasks here, if any
        };
    }, [key]);
        
    

    return (
        <div id='macros'>
            <p>Calories: {macros["calories"]}kcal</p>
            <p>Protein: {macros["protein"]}g</p>
        </div>
    )
}
