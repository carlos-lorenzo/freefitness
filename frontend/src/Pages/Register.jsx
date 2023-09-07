import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"

export default function Register({ setLoggedIn, client }) {
    const [email, setEmail] = useState();
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

    let navigate = useNavigate();

    function submitRegistration(e) {
        e.preventDefault();
        client.post(
            "/api/register",
            {
                email: email,
                username: username,
                password: password
            }
        ).then(function(res) {
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
        });
    }

  return (
    <form onSubmit={submitRegistration}>

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


        <button ><h4>Register</h4></button>
    </form>
  )
}
