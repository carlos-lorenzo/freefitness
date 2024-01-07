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

// Fetch the CSRF token
client.get('/api/get_csrf_token')
.then(response => {
    client.defaults.headers.common['X-CSRFToken'] = response.data.csrfToken;
}) .catch(error => {
    console.error('Error fetching CSRF token:', error);
});



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
