import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"


export default function LogIn({ setLoggedIn, client }) {
    const [email, setEmail] = useState();
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
    
    

    let navigate = useNavigate();

    function handleLogIn(e) {
        e.preventDefault();
        client.post(
            "/api/login",
            {
                email: email,
                password: password
            }
        ).then(function(res) {
            setLoggedIn(true);
            navigate('/profile');

        });
    }

    return (
        <>
            <form onSubmit={handleLogIn}>

                <input 
                type="text" 
                id="email"
                placeholder="email"
                autoComplete="off"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}/>

                <input 
                type="text" 
                id="username"
                placeholder="username"
                autoComplete="off"
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}/>

                <input 
                type="password" 
                id="password"
                placeholder="password"
                autoComplete="none"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}/>


                <button ><h4>Log In</h4></button>
            </form>
            <p>Don't have an account? {<Link to="/register" >Register.</Link>}</p>
        </>
        
    )
}