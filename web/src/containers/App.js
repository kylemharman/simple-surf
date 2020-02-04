import React, { useState } from 'react';

import { navigate } from "@reach/router";
import axios from 'axios'
// components
import Routes from './Routes'
import NavBar from '../components/NavBar';
import FormLogin from '../components/FormLogin'

const App = (props) => {
    
    const [userToken, setUserToken] = useState(false);
    console.log(userToken)
	// const [userInfo, setUserInfo] = useState(false);

	const handleLogin = (userEmail, userPassword) => {
		
		axios.post('/login', { email: userEmail, password: userPassword })
            .then( res => {
                if(res.status === 200) {
                    localStorage.setItem("userToken", JSON.stringify(res.data.token))
                    // localStorage.setItem("userInfo", JSON.stringify(res.data.user))
                }
                setUserToken(JSON.parse(localStorage.getItem("userToken")))
                navigate('/favorites')
            })
            .catch( e => console.log(e));
	}

    const handleLogout = () => {
        
        axios.post('/logout', null, { headers : { 'Authorization': `Bearer ${userToken}`} })
            .then( res => { 
                console.log(res)
                // localStorage.removeItem('userInfo');
                localStorage.removeItem('userToken');
                setUserToken(false)
                navigate('/')
            })
            .catch( e => { console.log(e);});
    }
	
    return (
        <div>
            <NavBar userToken={userToken} logout={() => handleLogout()} />
            <FormLogin login={ (userEmail, userPassword) => handleLogin(userEmail, userPassword)}/>
            
            <Routes />
        </div>
    )
}

export default App