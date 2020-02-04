import React from 'react'
import {Link} from '@reach/router'
// styles
import { Nav } from '../styles/NavBarStyled';
// components


const NavBar = (props) => {
    
    console.log(props.userToken)

    return (
        <header>
            <Nav>
                <React.Fragment>
                    <Link to="/"><h3>SimpleSurf</h3></Link>
                </React.Fragment>
                
                <React.Fragment>
                    <Link to="/forecasts">Forecasts</Link>
                    { !props.userToken ? 
                        <React.Fragment>
                            <Link to="/sign-up">Sign Up</Link>
                            <Link to="/login">Login</Link>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Link to="/favorites">Favorites</Link>
                            <Link to="/" onClick={ props.logout } >Logout</Link>
                            
                        </React.Fragment>
                    }
                </React.Fragment>
            </Nav>    
        </header>
    )
}

export default NavBar
