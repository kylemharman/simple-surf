import React from 'react';
import FormSignUp from '../components/FormSignUp';
import { Container } from '../styles/GlobalStyles';

const SignUp = (props) => {
    return (
        <Container margin col center>
            <h1>Sign Up</h1>
            <FormSignUp signUp={ (userName, userEmail, userPassword) => props.signUp(userName,userEmail, userPassword)} />
        </Container>
    )
}

export default SignUp
