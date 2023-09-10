import React from 'react'
import { useState, useEffect } from 'react';

import { Link, useNavigate } from "react-router-dom"

import CreateMeal from './Components/CreateMeal';
import Tracker from './Components/Tracker';


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
            <div id='must-login'>
                <h2>You're not logged in, {<Link to="/login" >Log In</Link>}</h2>
            </div>
        
        )
	} else {
		return (
			<>
				<h1 className='centred'>Welcome</h1>
                <div id='profile-page'>
                    <Tracker client={client} key={key} />
                    <CreateMeal client={client} setKey={setKey}/>
                </div>
                
			</>
		)
	}
}
