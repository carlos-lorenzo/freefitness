import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faSquarePlus } from '@fortawesome/free-solid-svg-icons'

function Navbar({ loggedIn, client}) {
    return (
        <>
            <div className="navbar">
                <div id="navbar-items">
                <Link to="/" className="nav-link">
                    <FontAwesomeIcon icon={faHouse} style={{color: "white"}}/>
                </Link>
                <Link to ={{
                    pathname: "diet/",
                    state: {
                        loggedIn: loggedIn,
                        client: client
                    }
                }}>
                    <FontAwesomeIcon icon={faSquarePlus} style={{color: "white"}} size="2xl"/>
                </Link> 
                <Link to ={{
                    pathname: "profile/",
                    state: {
                        loggedIn: loggedIn,
                        client: client
                    }
                }}>
                    <FontAwesomeIcon icon={faUser} style={{color: "white"}} size="2xl"/>
                </Link>   
                </div>
            </div>  
        </>
    )
}

export default Navbar