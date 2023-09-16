import React from 'react'

import { Link, useNavigate } from "react-router-dom"

export default function Challenge() {
    let navigate = useNavigate();


    function navigateToProfile() {
        navigate("/register");
    }
    

    return (
        <div id="challenge" className='full-height'>
            <h3>Ah yes... I see you have chosen wisely. <br/>Let's see if ur worthy. <br/>10 pushups, NOW. <br/>...yes, NOW.</h3>
            
            
            <button onClick={navigateToProfile} className='border important'><h2>I'm Worthy</h2></button>
            
            
        </div>
    )
}
