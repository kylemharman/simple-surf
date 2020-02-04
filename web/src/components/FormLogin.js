import React, { useState } from 'react'

const FormLogin = (props) => {
    
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    return (
        <React.Fragment> 
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
        </React.Fragment>
    )
}

export default FormLogin
