import React from 'react';

export default function Home() {
    const accent = { color: '#b12f2f' };
    const primary = { color: '#0a6161' };

    return (
        <div id='home'>
            <span>
                <h1 id='home-title'>FREE-FITNESS</h1>
                <h2 id='home-description'>
                    A <span style={primary}>GODLIKE</span> physique can only be achieved through a rigorous diet. <br />
                    So start <span style={primary}>CUTTING</span> you <span style={accent}>FAT FUCK</span> and <span style={primary}>BULKING</span> you <span style={accent}>SKINNY BITCH</span>.
                </h2>
                <button id="villain-arc" className='border'><h3>START VILLAIN ARC</h3></button>
            </span>
            
        </div>
    );
}