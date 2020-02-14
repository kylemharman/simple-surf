import React from 'react'
import {Link} from '@reach/router'
// styles
import { Nav, LoginButton, NavLink } from '../styles/NavBarStyled';
// components


const NavBar = (props) => {

    return (
        <header>
            <Nav>
                <div>
                    <Link to="/"><strong>SimpleSurf</strong></Link>
                </div>
                
                <div>
                    { !props.user ? 
                        <React.Fragment>
                            <NavLink to="/sign-up">Sign Up</NavLink>
                            <LoginButton to="/login">Login</LoginButton>
                        </React.Fragment>
                        : 
                        <React.Fragment>
                            <NavLink to="/forecasts">Forecasts</NavLink>
                            <NavLink to="/favorites">Favorites</NavLink>
                            <NavLink to="/" onClick={ props.logout }>Logout</NavLink>
                        </React.Fragment>
                    }
                </div>
            </Nav>    
        </header>
    )
}

export default NavBar
