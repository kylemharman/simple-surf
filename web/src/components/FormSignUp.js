import React, { useState, useContext } from 'react'
import { FormContainer } from '../styles/FormsStyled';
import { UserContext } from '../contexts/UserContext';
import { Redirect } from "react-router-dom";

const FormSignUp = () => {
    
    const [userName, setUserName] = useState(""); // name
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confrimUserPassword, setUserConfirmPassword] = useState("");
    const {handleSignUp, userInfo} = useContext(UserContext)


    return (
        <FormContainer> 
            <input 
                type="text"
                name="name"
                placeholder="Name"
                onChange={ e => setUserName(e.target.value)} 
                required />
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
            <input 
                type="password"
                name="password-confirm"
                placeholder="Confirm Password"
                onChange={ e => setUserConfirmPassword(e.target.value)}
                required />
            <button onClick={() => handleSignUp( userName, userEmail, userPassword, )}>Sign Up</button>
            { userInfo ? 
                <Redirect to={'/forecasts'}  /> : null
            }
        </FormContainer>
    )
}

export default FormSignUp
