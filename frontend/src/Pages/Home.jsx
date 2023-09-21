import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Home() {

    const accent = { color: '#b12f2f' };
    const primary = { color: '#0a6161' };
    let navigate = useNavigate();

    function executeOrder66 () {
        navigate("/challenge");
    }

    return (
        <div id='home' >
            <span id='home-content'>
                <h1 id='home-title'>BECOME BETTER.</h1>
                <h2 id='home-description'>
                    An <span style={primary}>AESTHETIC</span> physique can <span style={accent}>ONLY</span> be achieved through a rigorous diet. <br />
                    So start <span style={primary}>tracking</span> your macros and live a <span style={primary}>healthier</span> lifestyle.
                </h2>
                <button onClick={executeOrder66} id="villain-arc" className='border positive'><h3>START LIVING</h3></button>
            </span>
        </div>
    );
}