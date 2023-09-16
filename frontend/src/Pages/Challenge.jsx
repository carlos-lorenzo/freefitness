import React from 'react'

import { Link, useNavigate } from "react-router-dom"

export default function Challenge() {
    let navigate = useNavigate();


    function navigateToProfile() {
        navigate("/register");
    }
    

    return (
        <div id="challenge" className='full-height'>
            <h2>Ah yes... I see you have chosen wisely. <br/>Let's see if ur worthy. <br/>10 pushups, NOW. <br/>...yes, NOW.</h2>
            
            
            <button onClick={navigateToProfile} className='border important negative'><h1>I'm Worthy</h1></button>
            
            
        </div>
    )
}
