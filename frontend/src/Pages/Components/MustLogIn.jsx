import React from 'react'
import { Link, useNavigate } from "react-router-dom"

export default function MustLogIn() {
    return (
        <div id='must-login'>
            <h2>You're not logged in, {<Link to="/login" >Log In</Link>}</h2>
        </div>
    )
}
