import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { NavBarContainer, NavLinkStyled } from '../styles/NavBarStyled';

import { UserContext } from '../contexts/UserContext';


const NavBar = () => {

    const { userInfo, handleLogout } = useContext(UserContext)

    return (
        <NavBarContainer>
            <div>
                <Link to="/"><h4>Simple Surf</h4></Link>
            </div>
            <div>
            { !userInfo ?
                <React.Fragment>
                    <NavLinkStyled to="/sign-up" activeClassName={"active"} >Sign Up</NavLinkStyled>
                    <NavLinkStyled to="/login" activeClassName={"active"}>Login</NavLinkStyled>
                </React.Fragment>
                : 
                <React.Fragment>
                    <NavLinkStyled to="/forecasts" activeClassName={"active"}>Forecasts</NavLinkStyled>
                    <NavLinkStyled to="/favorites" activeClassName={"active"}>Favorites</NavLinkStyled>
                    <NavLinkStyled to="/" onClick={ handleLogout }>Logout</NavLinkStyled>
                </React.Fragment>    
            } 
            </div>
        </NavBarContainer>
    )
}

export default NavBar