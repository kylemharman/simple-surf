import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
// components
import NavBar from '../components/NavBar';
import { ToastContainer } from 'react-toastify';
// styles
import { ThemeProvider } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from '../styles/theme';
//routes
import Landing from "../pages/Landing";
import Forecasts from "../pages/Forecasts";
import Favorites from "../pages/Favorites";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Location from "../pages/Location";
// context
import { UserProvider, UserContext } from '../contexts/UserContext';


const App = () => {
    
    const userInfo = useContext(UserContext)
    console.log(userInfo)
    
    return (
        <UserProvider>
            <ThemeProvider theme={theme}>
                <Router>
                <NavBar />    
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/forecasts" component={Forecasts} />
                    <Route exact path="/favorites" component={Favorites} />
                    <Route exact path="/location/:id" component={Location} />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/sign-up" component={SignUp} />
                    <Route exact path="/login" component={Login} />
                </Router>
                <ToastContainer />
            </ThemeProvider>
        </UserProvider>
    )
}

export default App