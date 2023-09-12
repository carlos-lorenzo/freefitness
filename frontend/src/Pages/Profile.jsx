import React from 'react'
import { useState, useEffect } from 'react';

import { Link, useNavigate } from "react-router-dom"

import CreateMeal from './Components/CreateMeal';
import Tracker from './Components/Tracker';
import MustLogIn from './Components/MustLogIn';

export default function Profile({ loggedIn , setLoggedIn, client }) {
	let navigate = useNavigate();

    const [key, setKey] = useState(Math.random());

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
					<button onClick={handleLogout} className='border'>Logount</button>
                </div>
                
			</>
		)
	}
}
