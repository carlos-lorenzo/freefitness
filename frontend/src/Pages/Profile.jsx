import React from 'react'
import { useState, useEffect } from 'react';

import { Link, useNavigate } from "react-router-dom"


export default function Profile({ loggedIn , setLoggedIn, client }) {
	let navigate = useNavigate();

	

	function handleLogout(e) {
		e.preventDefault();
		client.post(
		  	"/api/logout",
		  	{withCredentials: true}
		).then(function(res) {
			setLoggedIn(false);
			navigate('/');
		});
	}


	if (!loggedIn) {
		return (<p>You're not logged in, {<Link to="/login" >Log In.</Link>}</p>)
	} else {
		return (
			<>
				<h3>Welcome</h3>
				<form onSubmit={handleLogout}>
					<button ><h4>Log Out</h4></button>
				</form>
			</>
		)
	}
}
