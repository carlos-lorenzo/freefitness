import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'


export default function Footer() {

    return (
        <div id='footer'>
            <h3 className='contrast footer-item'>Carlos Lorenzo</h3>
            <a href="https://www.github.com/carlos-lorenzo" className='footer-item'>
                <FontAwesomeIcon icon={faGithub} style={{ color: "white" }} size="2xl" />
            </a>
        </div>
    )
}
