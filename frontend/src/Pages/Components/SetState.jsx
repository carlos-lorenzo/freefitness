import React from 'react'
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';


export default function SetState({ client }) {

    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        // Fetch the CSRF token on component mount
        client.get('/api/get_csrf_token')
            .then(response => {
                setCsrfToken(response.data.csrfToken);
            })
            .catch(error => {
                console.error('Error fetching CSRF token:', error);
            });
    }, []);



    function handleStateUpdate(e) {
		e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        let newState = Object.fromEntries(formData)["state"];
        
        if (newState >= 1 && newState <= 3) {
            client.post(
                "/api/update_state",
                formData,
                { headers: { 'X-CSRFToken': csrfToken } },
                
            ).then(function(response){
                
                toast.success(`State updated`, {
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
            toast.warning(`You must select a state`, {
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
    
        <form onSubmit={handleStateUpdate} className='property-form'>
            <label htmlFor="state-select">State</label>
            <select name="state" id="state-select">
                <option value="0">Select State</option>
                <option value="1">Cutting</option>
                <option value="2">Maintaining</option>
                <option value="3">Bulking</option>
            </select>
            <button className="border" type='submit'><h4>Update</h4></button>
        </form>
   
    )
}
