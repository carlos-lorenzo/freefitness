import React from 'react'
import { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import MustLogIn from './Components/MustLogIn';
import SetState from './Components/SetState';
import SetSex from './Components/SetSex';
import SetNumeric from './Components/SetNumeric';
import Logout from './Components/Logout';

export default function Profile({ loggedIn , setLoggedIn, client }) {
	
	if (!loggedIn) {
		return (
            <MustLogIn />
        )

	} else {
		return (
                <div id='profile-page' className='full-height full-width'>
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
                    <h1>Profile</h1>
					<SetNumeric client={client} property={"height"} unit={"cm"}/>
                    <SetNumeric client={client} property={"weight"} unit={"kg"}/>
                    <SetSex client={client}/>
                    <SetState client={client}/>
                    <Logout client={client} setLoggedIn={setLoggedIn}/>
                </div>
		)
	}
}