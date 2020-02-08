import React from 'react'
import {Link} from '@reach/router'
// styles
import { Nav } from '../styles/NavBarStyled';
// components


const NavBar = (props) => {

    return (
        <header>
            <Nav>
                <div>
                    <Link to="/"><strong>SimpleSurf</strong></Link>
                </div>
                
                <div>
                    {/* { !props.user ?  */}
                        <React.Fragment>
                            <Link to="/sign-up">Sign Up</Link>
                            <Link to="/login">Login</Link>
                        </React.Fragment>
                        {/* : */}
                        <React.Fragment>
                            <Link to="/forecasts">Forecasts</Link>
                            <Link to="/favorites">Favorites</Link>
                            <Link to="/" onClick={ props.logout }>Logout</Link>
                        </React.Fragment>
                    {/* } */}
                </div>
            </Nav>    
        </header>
    )
}

export default NavBar
