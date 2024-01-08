import React from 'react'

import { useNavigate } from "react-router-dom";

export default function Logout({ client, setLoggedIn }) {
    let navigate = useNavigate();
    function handleLogout(e) {
		e.preventDefault();
		client.post(
		  	"/api/logout",
		  	{withCredentials: true}
		).then(function(response) {
            client.defaults.headers.common['Authorization'] = ``;
			setLoggedIn(false);
			navigate('/');
		});
	}
    return (
        <button onClick={handleLogout} className='border negative' id="logout-button"><h4>Logout</h4></button>
    )
}
