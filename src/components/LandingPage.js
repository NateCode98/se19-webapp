import React, {useContext}from "react";
import { Auth0Context } from "../auth/react-auth0-spa";
import "./LandinPagestyles.css"
import { useHistory } from "react-router-dom";
function LandingPage() {
    const auth0 = useContext(Auth0Context);
    return (
        <div>
            <div className="landingpage-background">
                <h1 className="landingpage-header">Welcome</h1>
                <p className="landingpage-description">This app lets you to set a reminder</p>
                <button className="login-button" onClick={() => {auth0.loginWithRedirect()}}>Login</button>
            </div>
        </div>
    )}
export default LandingPage