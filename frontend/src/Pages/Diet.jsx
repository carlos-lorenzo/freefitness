import React from 'react'
import { useState, useEffect } from 'react';

import CreateMeal from './Components/CreateMeal';
import Tracker from './Components/Tracker';
import MustLogIn from './Components/MustLogIn';

export default function Diet({ loggedIn, setLoggedIn, client }) {

    const [key, setKey] = useState(Math.random());

    if (!loggedIn) {
		return (
            <MustLogIn />
        )
    } else {
        return  (
            <div>
                <div id='meal-page'>
                    <Tracker client={client} key={key} />
                    <CreateMeal client={client} setKey={setKey}/>
                </div>
            </div>
        )
    }
    
}
