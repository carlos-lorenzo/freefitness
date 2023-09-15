import React from 'react'
import { useState, useEffect } from 'react';


import MustLogIn from './Components/MustLogIn';
import SetState from './Components/SetState';
import SetNumeric from './Components/SetNumeric';
import Logout from './Components/Logout';

export default function Profile({ loggedIn , setLoggedIn, client }) {
	
	if (!loggedIn) {
		return (
            <MustLogIn />
        )

	} else {
		return (
			<>
                <div id='profile-page' className='full-height full-width'>
                    <h1>Profile</h1>
					<SetNumeric client={client} property={"height"} unit={"cm"}/>
                    <SetNumeric client={client} property={"weight"} unit={"kg"}/>
                    <SetState client={client}/>
                    <Logout client={client} setLoggedIn={setLoggedIn}/>
                </div>
                
			</>
		)
	}
}