import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//Components
import login from "./components/login";
import register from "./components/register";
import home from "./components/home";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#0f8c9a",
            main: "#00bcd4",
            dark: "#008394",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff6333",
            main: "#ff3d00",
            dark: "#b22a00",
            contrastText: "#fff",
        },
    },
    typography: {
        useNextVariants: true,
    },
});

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path='/' component={home}/>
                    <Route path='/login' component={login}/>
                    <Route path='/register' component={register}/>
                </Switch>
            </Router>
        </MuiThemeProvider>
    );
}

export default App;
