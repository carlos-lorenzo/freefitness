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
import Challenge from './Pages/Challenge';




axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
	baseURL: "http://192.168.0.209:8000"
})


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
                <Route path='/challenge' element={<Challenge/>} />

			</Routes>
            <Footer/>
		</>
  	)
}

export default App
