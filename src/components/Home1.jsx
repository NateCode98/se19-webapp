import React, { useContext } from 'react';
import { Auth0Context } from '../auth/react-auth0-spa';
import Home from "./home";

function Home1() {
    const auth0 = useContext(Auth0Context);
    console.log(auth0.user);
    return (
        <div>
            <Home userProp= {auth0.user} />
        </div>
    );
}
export default Home1;