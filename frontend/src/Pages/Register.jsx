import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        }).catch(function(error) {
            toast.error("Invalid credentials", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        });
    }

  return (
    <>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <div className='centred full-width full-height' id='register-container'>
            <form onSubmit={submitRegistration} id='register-form'>
                <h2>Register</h2> 
                <input 
                type="text" 
                className='border'
                id="email"
                placeholder="email"
                autoComplete="off"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}/>

                <input 
                type="text"
                className='border' 
                id="username"
                placeholder="username"
                autoComplete="off"
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}/>

                <input 
                type="password" 
                className='border'
                id="password"
                placeholder="password"
                autoComplete="none"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}/>


                <button className='border'><h4>Register</h4></button>
                <p>Already have an account? {<Link to="/login" >Login</Link>}</p> 
            </form>
            
        </div>
    </>
    
    
  )
}
