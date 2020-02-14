import React from 'react'
import FormLogin from '../components/FormLogin'
import { Container, FormContainer } from '../styles/GlobalStyles'

const Login = (props) => {
    
    return (
        <Container vh col center img>
            <FormContainer>
                <h1>Login</h1>
                <FormLogin 
                    login={(userEmail, userPassword) => props.login(userEmail, userPassword)} 
                    loginMessage={props.loginMessage} 
                />
            </FormContainer>
        </Container>
    )
}

export default Login
