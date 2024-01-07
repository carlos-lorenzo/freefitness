import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from "axios";

import Navbar from './Pages/Components/Navbar';
import Home from './Pages/Home';
import Footer from './Pages/Components/Footer';
import Profile from './Pages/Profile';
import LogIn from './Pages/LogIn';
import Register from './Pages/Register';
import Diet from './Pages/Diet';


import { ToastContainer } from 'react-toastify';


// Axios settings for authentication
axios.defaults.xsrfCookieName = 'X-CSRFToken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: `https://freefitness-api.vercel.app/`, 
});

// Create a request interceptor to set CSRF token in headers
client.interceptors.request.use(
    async (config) => {
        try {
            // Fetch the CSRF token
            const response = await client.get('/api/get_csrf_token');
            const csrfToken = response.data.csrfToken;

            // Set the CSRF token in the request headers
            config.headers['X-CSRFToken'] = csrfToken;
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	
	return (
		<>
			<Navbar loggedIn={loggedIn}/>
			<Routes>
				<Route path='/' element={<Home/>}/>
				<Route path='/profile' element={<Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} client={client}/>} />
				<Route path='/login' element={<LogIn setLoggedIn={setLoggedIn} client={client}/>} />
				<Route path='/register' element={<Register setLoggedIn={setLoggedIn} client={client}/>} />
				<Route path='/diet' element={<Diet loggedIn={loggedIn} client={client}/>} />
			</Routes>
            <Footer/>

            <ToastContainer
                position="top-right"
                autoClose={300000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={document.documentElement.getAttribute('data-theme')}
            />
		</>
  	)
}

export default App
