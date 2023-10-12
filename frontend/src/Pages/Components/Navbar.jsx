import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faAppleWhole } from '@fortawesome/free-solid-svg-icons'

function Navbar({ loggedIn, client}) {
    return (
        <>
            <div className="navbar">
                
                <div id="navbar-items">
                <Link to="/" className="nav-link">
                    <img src = "/FreeFitnessLogo-min.png" alt="Logo" width={"120px"} height={"60px"}/>
                </Link>
                {loggedIn && (
                        <Link
                            to={{
                                pathname: "diet/",
                                state: {
                                    loggedIn: loggedIn,
                                    client: client
                                }
                            }}
                            className="nav-link"
                        >
                            <FontAwesomeIcon icon={faAppleWhole} style={{ color: "white" }} size="2xl" />
                        </Link>
                    )}
                <Link 
                to ={{
                    pathname: "profile/",
                    state: {
                        loggedIn: loggedIn,
                        client: client
                    }
                }}
                className="nav-link"
                >
                    <FontAwesomeIcon icon={faUser} style={{color: "white"}} size="2xl"/>
                </Link>   
                </div>
            </div>  
        </>
    )
}

export default Navbar