import React, { useState } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';
// components
import Routes from './Routes';
import NavBar from '../components/NavBar';
import { ToastContainer } from 'react-toastify';
// styles
import { ThemeProvider } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from '../styles/theme';

const App = () => {

    const [userToken, setUserToken] = useState(false);
	const [userInfo, setUserInfo] = useState(false);
	const [loginMessage, setLoginMessage] = useState("");

	const handleLogin = (userEmail, userPassword) => {
		
		axios.post('/login', { email: userEmail, password: userPassword })
            .then( res => {
                if(res.status === 200) {
                    localStorage.setItem("userToken", JSON.stringify(res.data.token))
                    setUserToken(res.data.token)
                    setUserInfo(res.data.user)
                    navigate('/forecasts')
                }
            })
            .catch( e => {
                setLoginMessage("Incorrect login details, please try again.")
                console.log(e)
            });
	}
    
    const handleLogout = () => {
        
        axios.post('/logout', null, { headers : { 'Authorization': `Bearer ${userToken}`} })
        .then( res => { 
                localStorage.removeItem('userToken');
                // localStorage.removeItem('userInfo');
                setUserToken(false)
                setUserInfo(false)
                navigate('/')
            })
            .catch( e => { console.log(e);});
    }

    const handleSignUp = (userName, userEmail, userPassword) => {
        axios.post('/sign-up', { name: userName, email: userEmail, password: userPassword })
            .then( res => {
                if(res.status === 201) {
                    localStorage.setItem("userToken", JSON.stringify(res.data.token))
                    setUserToken(res.data.token)
                    setUserInfo(res.data.user)
                    navigate('/forecasts')
                    console.log(res.data)
                }
            })
            .catch( e => {
                console.log(e)
            });
    }

    const handleFavorites = (location) => {
        
        const userFavourite = userInfo.favorites.some(userFav => userFav.locationID === location._id)

        if (userFavourite) {
            axios.post(`/user/favorites/${location._id}`, null, { headers : { 'Authorization': `Bearer ${userToken}`} })
                .then( res => {
                    setUserInfo(res.data)
                    console.log(`removed: ${res}`)
                })
                .catch( e => console.log(e))
        } else if (!userFavourite) {
            axios.post('/user/favorites', { locationID: location._id, name: location.name }, { headers : { 'Authorization': `Bearer ${userToken}`} })
                .then( res => {
                    
                    setUserInfo(res.data)
                    console.log(`added: ${res}`)
                    
                }) 
                .catch( e => console.log(e) )
        }

        console.log(userInfo.favorites)
    }

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <NavBar user={userInfo} logout={() => handleLogout()} />
                <Routes 
                    user={userInfo} 
                    login={ (userEmail, userPassword) => handleLogin(userEmail, userPassword)}
                    signUp={ (userName ,userEmail, userPassword) => handleSignUp(userName, userEmail, userPassword)}
                    addToFavorites={(location) => handleFavorites(location)}
                    loginMessage={loginMessage}
                />
            <ToastContainer />
            </React.Fragment>
        </ThemeProvider>
    )
}

export default App