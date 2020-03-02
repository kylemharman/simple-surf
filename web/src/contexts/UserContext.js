import React, { useState, createContext } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = (props) => {
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
                return <Redirect to={'/'} />
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
                    return <Redirect to={'/forecasts'} />
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
        <UserContext.Provider value={{userInfo, handleLogin, handleLogout, handleSignUp, handleFavorites}}>
            {props.children}
        </UserContext.Provider>
    );
}

