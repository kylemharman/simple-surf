import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
// context
import { UserContext } from './contexts/UserContext';


export const ProtectedRoute = ({component: Component, ...rest}) => {
    
    const userInfo = useContext(UserContext)
    
    return (
        <Route {...rest} 
            render = { (props) => {
                if (userInfo) {
                    return <Component {...props} /> 
                } else {
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />
    )
}
