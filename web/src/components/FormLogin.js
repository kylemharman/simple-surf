import React, { useState, useContext } from 'react';
import { FormContainer } from '../styles/FormsStyled';
import { UserContext } from '../contexts/UserContext';
import { Redirect } from "react-router-dom";

const FormLogin = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {handleLogin, userInfo} = useContext(UserContext)
    
    return (
        <FormContainer> 
            <input 
                type="email"
                name="email"
                placeholder="Email"
                onChange={ e => setEmail(e.target.value)} 
                required />
            <input 
                type="password"
                name="password"
                placeholder="Password"
                onChange={ e => setPassword(e.target.value)}
                required />
            <button onClick={() => handleLogin(email,password)}>Login</button>
            { userInfo ? 
                <Redirect to={'/forecasts'}  /> : null
            }
        </FormContainer>

    )
}

export default FormLogin
