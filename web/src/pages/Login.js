import React from 'react'
import FormLogin from '../components/FormLogin'

import { Container, FormContainer } from '../styles/GlobalStyles'

const Login = () => {

    return (
        <Container vh col center img>
            <FormContainer>
                <h1>Login</h1>
                <FormLogin />
            </FormContainer>
        </Container>
    )
}

export default Login
