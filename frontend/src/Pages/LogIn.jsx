import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LogIn({ setLoggedIn, client }) {
    const [email, setEmail] = useState();
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
            console.log(res);
            setLoggedIn(true);
            
            navigate('/diet');

        }).catch(function(error) {
            toast.error("Invalid login credentials", {
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
            <div className='centred full-width full-height' id='login-container'>
                
                <form onSubmit={handleLogIn} id='login-form'>
                    <h2>Login</h2> 
                    <input 
                    className='border'
                    type="text" 
                    id="email"
                    placeholder="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}/>

                   
                    <input 
                    className='border'
                    type="password" 
                    id="password"
                    placeholder="password"
                    autoComplete="none"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}/>


                    <button className='border'><h4>Submit</h4></button>
                    <p>Don't have an account? {<Link to="/register" >Register</Link>}</p> 
                    </form>
                      
            </div>
            
        </>
        
    )
}
