import React, { useState } from 'react';
import { navigate } from "@reach/router";
import axios from 'axios';
// components
import Routes from './Routes';
import NavBar from '../components/NavBar';
// styles
import { Container } from '../styles/GlobalStyles';

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
                    navigate('/favorites')
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
                    navigate('/')
                    console.log(res.data)
                }
            })
            .catch( e => {
                console.log(e)
            });
    }

    return (
        <React.Fragment>
            <NavBar user={userInfo} logout={() => handleLogout()} />
        <Container>
            <Routes 
                user={userInfo} 
                login={ (userEmail, userPassword) => handleLogin(userEmail, userPassword)}
                signUp={ (userName ,userEmail, userPassword) => handleSignUp(userName, userEmail, userPassword)}
                loginMessage={loginMessage}/>
        </Container>
        </React.Fragment>
    )
}

export default App