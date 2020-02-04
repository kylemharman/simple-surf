import React, { useState } from 'react'


const FormSignUp = (props) => {
    
    const [userName, setUserName] = useState(""); // name
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    return (
        <React.Fragment> 
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
            <button onClick={() => props.signUp( userName, userEmail, userPassword, )}>Sign Up</button> 
        </React.Fragment>
    )
}

export default FormSignUp
