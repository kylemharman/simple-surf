import React from 'react'
import FormLogin from '../components/FormLogin'
import { Container } from '../styles/GlobalStyles'

const Login = (props) => {
    
    return (
        <Container margin col center>
            <h1>Login</h1>
            <FormLogin 
                login={(userEmail, userPassword) => props.login(userEmail, userPassword)} 
                loginMessage={props.loginMessage} />
        </Container>
    )
}

export default Login
