import React, {useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home1 from "./components/Home1";
import {Auth0Context} from "../src/auth/react-auth0-spa";


function App() {
    const auth0 = useContext(Auth0Context);
    return (
        <Router>
            <div className="App">
                <Route  exact path= "/" render={() => {return <LandingPage />}} />
                <Route   path= "/homescreen" render={() => {return (!auth0.isAuthenticated ? <LandingPage/> : <Home1/>)}} />
            </div>
        </Router>
    );
}

export default App;
