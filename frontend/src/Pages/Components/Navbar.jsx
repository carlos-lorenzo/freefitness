import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faSquarePlus } from '@fortawesome/free-solid-svg-icons'

function Navbar({ loggedIn, client}) {
    return (
        <>
            <div className="navbar">
                <Link to="/" className="nav-link">
                    <FontAwesomeIcon icon={faHouse} />
                </Link>
                <Link to ={{
                    pathname: "profile/",
                    state: {
                        loggedIn: loggedIn,
                        client: client
                    }
                }}>
                    <FontAwesomeIcon icon={faUser} />
                </Link>   
            </div>  
        </>
    )
}

export default Navbar