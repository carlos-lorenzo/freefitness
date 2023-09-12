import React from 'react'
import { useState, useEffect } from 'react';

import CreateMeal from './Components/CreateMeal';
import Tracker from './Components/Tracker';

export default function Diet({ loggedIn, setLoggedIn, client }) {

    const [key, setKey] = useState(Math.random());
    return  (
    <div>
        <div id='profile-page'>
            <Tracker client={client} key={key} />
            <CreateMeal client={client} setKey={setKey}/>
        </div>
    </div>
  )
}
