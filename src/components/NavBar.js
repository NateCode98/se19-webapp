import React, {useContext} from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import {Auth0Context} from "../auth/react-auth0-spa";

function NavBar (props){
    const auth0 = useContext(Auth0Context);
    return(
        <div className="NavBar">
            <div className="NavWrapper">
                <div className="NavBarItem">
                    <Link to="/homescreen" >Home</Link>
                </div>
            </div>
            <button className="logout-button" onClick={() => {auth0.logout()}}><div>Logout</div></button>
        </div>
    )
}
export default NavBar