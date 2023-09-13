import React from 'react'
import { useState, useEffect } from 'react';

import { Link, useNavigate } from "react-router-dom"

import MustLogIn from './Components/MustLogIn';

export default function Profile({ loggedIn , setLoggedIn, client }) {
	let navigate = useNavigate();

    

	function handleLogout(e) {
		e.preventDefault();
		client.post(
		  	"/api/logout",
		  	{withCredentials: true}
		).then(function(response) {
			setLoggedIn(false);
			navigate('/');
		});
	}
	
	function handleStateUpdate(e) {
		e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

		client.post(
			"/api/update_state",
            formData,
			{withCredentials: true},
            
            
		).then(function(response){
			console.log(response)
		})
	}
		
	



	if (!loggedIn) {
		return (
            <MustLogIn />
        
        )
	} else {
		return (
			<>
                <div id='profile-page'>
                    <h1>Profile</h1>
					<button onClick={handleLogout} className='border'>Logout</button>
					<form onSubmit={handleStateUpdate}>
						<select name="state" id="state-select">
							<option value="1">Cutting</option>
							<option value="2">Maintaining</option>
							<option value="3">Bulking</option>
						</select>
						<button className="border" type='submit'><h4>Submit</h4></button>
					</form>
					
                </div>
                
			</>
		)
	}
}