import React from 'react'
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
export default function SetActivity({ client }) {

    


    function handleActivityUpdate(e) {
		e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        let newActivity = Object.fromEntries(formData)["activity"];

        if (newActivity >= 1 && newActivity <= 5){
            client.post(
                "/api/update_activity",
                formData,
                
            ).then(function(response){
                toast.success(`Activity updated`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            })
        } else {
            toast.warning(`You must select an activity level`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
		
	}

    return (
    
        <form onSubmit={handleActivityUpdate} className='property-form'>
            <label htmlFor="activity-select">Activity</label>
            <select name="activity" id="activity-select">
                <option value="0">Set activity level</option>
                <option value="1">None</option>
                <option value="2">Light</option>
                <option value="3">Moderate</option>
                <option value="4">Very active</option>
                <option value="5">Extremely active</option>
            </select>
            <button className="border" type='submit'><h4>Update</h4></button>
        </form>
   
    )
}
