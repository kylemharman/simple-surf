import React, { useState } from 'react';
import { FormContainer } from '../styles/FormsStyled';

const FormLogin = (props) => {
    
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    return (
        <FormContainer> 
            <input 
                type="email"
                name="email"
                placeholder="Email"
                onChange={ e => setUserEmail(e.target.value)} 
                required />
            <input 
                type="password"
                name="password"
                placeholder="Password"
                onChange={ e => setUserPassword(e.target.value)}
                required />
            <button onClick={() => props.login(userEmail, userPassword)}>Login</button>
            <p>{props.loginMessage}</p> 
        </FormContainer>
    )
}

export default FormLogin
