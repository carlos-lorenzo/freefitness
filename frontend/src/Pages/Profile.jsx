import React from 'react'
import { useState, useEffect } from 'react';

import { Link, useNavigate } from "react-router-dom"

import MustLogIn from './Components/MustLogIn';
import SetState from './Components/SetState';
import SetHeight from './Components/SetHeight';


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
					<SetState client={client}/>
					<SetHeight client={client}/>
                </div>
                
			</>
		)
	}
}