import React from 'react'
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

export default function SetSex({ client }) {

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

    function handleSexUpdate(e) {
		e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

		client.post(
			"/api/update_sex",
            formData,
			{withCredentials: true},
            { headers: { 'X-CSRFToken': csrfToken } },
            
		).then(function(response){
			toast.success(`Sex updated`, {
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

    return (
    
        <form onSubmit={handleSexUpdate} className='property-form'>
            <label htmlFor="sex-select">Sex</label>
            <select name="sex" id="sex-select">
                <option value="1">Male</option>
                <option value="2">Female</option>
            </select>
            <button className="border" type='submit'><h4>Update</h4></button>
        </form>
   
    )
}
