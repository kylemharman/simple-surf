import React from 'react'
import FormLogin from '../components/FormLogin'


const Login = (props) => {
    
    return (
        <div>
            <h1>Login</h1>
            <FormLogin 
                login={(userEmail, userPassword) => props.login(userEmail, userPassword)} 
                loginMessage={props.loginMessage} />
        </div>
    )
}

export default Login
