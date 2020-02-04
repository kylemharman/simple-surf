import React from 'react';
import FormSignUp from '../components/FormSignUp';


const SignUp = (props) => {
    return (
        <React.Fragment>
            <h1>Sign Up</h1>
            <FormSignUp signUp={ (userName, userEmail, userPassword) => props.signUp(userName,userEmail, userPassword)} />
        </React.Fragment>
    )
}

export default SignUp
