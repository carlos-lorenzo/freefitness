import React from 'react'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SetNumeric({ client, property, unit }) {

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



    function handlePropertyUpdate(e) {
		e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

		client.post(
			`/api/update_${property}`,
            formData,
            { headers: { 'X-CSRFToken': csrfToken } },
			
            
            
		).then(function(response){
			toast.success(`${property.charAt(0).toUpperCase() + property.slice(1)} updated`, {
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
	}

    let min;
    let max;

    if (property === "weight") {
        min = 20;
        max = 500;
    } else if (property === "height") {
        min = 50;
        max = 280;
    }


    return (
        <form onSubmit={handlePropertyUpdate} className='property-form'>
            <label htmlFor={property}>{property.charAt(0).toUpperCase() + property.slice(1)}</label>
            <input id={property} name={property} type="number" placeholder={`${property} (${unit})`} min={min} max={max}/>
            <button type="submit" className='border'><h4>Update</h4></button>
        </form>
    )
}
