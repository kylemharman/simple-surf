import React from 'react';
import FormSignUp from '../components/FormSignUp';
import { Container, FormContainer } from '../styles/GlobalStyles';

const SignUp = (props) => {
    return (
        <Container vh col center img>
            <FormContainer>
                <h1>Sign Up</h1>
                <FormSignUp signUp={ (userName, userEmail, userPassword) => props.signUp(userName,userEmail, userPassword)} />
            </FormContainer>
        </Container>
    )
}

export default SignUp
