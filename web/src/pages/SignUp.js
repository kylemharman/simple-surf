import React from 'react';
import FormSignUp from '../components/FormSignUp';
import { Container, FormContainer } from '../styles/GlobalStyles';

const SignUp = () => {
    return (
        <Container vh col center img>
            <FormContainer>
                <h1>Sign Up</h1>
                <FormSignUp />
            </FormContainer>
        </Container>
    )
}

export default SignUp
