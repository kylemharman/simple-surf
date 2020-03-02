// import styled from 'styled-components';
// import { Link } from "@reach/router";

// export const Nav = styled.nav`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin: 30px 50px;

//     a {
//         margin-right: 30px;

//         &:last-child {
//             margin-right: 0;
//         }
//     }
// `;

// export const LoginButton = styled(Link)`
//     font-weight: 700;
//     border: 2px solid ${(props) => props.theme.color.primary };
//     color: ${(props) => props.theme.color.primary };
//     border-radius: 30px;
//     transition: 0.3s ease-in;
//     padding: 8px 30px;
//     &:hover {
//         color: ${(props) => props.theme.color.secondary };
//         border: 2px solid ${(props) => props.theme.color.secondary };
//     }
// `

// export const NavLink = styled(Link)`

//     transition: 0.1s ease-in;
//     padding: 8px 0;
//     &:hover {
//         color: ${(props) => props.theme.color.secondary };
//         border-bottom: 2px solid ${(props) => (props.logout ? "red" : props.theme.color.primary)};
//     }
// `

import styled from 'styled-components';
import { NavLink } from "react-router-dom";


export const NavBarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 50px;
    box-shadow: 0 2px 8px ${(props) => props.theme.color.lightGrey };

`

export const NavLinkStyled = styled(NavLink)`
  padding: 18px 30px;
  border-top: 2px solid transparent;
 
    &:hover {
        color: ${(props) => props.theme.color.primary };
        border-top: 2px solid ${(props) => props.theme.color.primary };
    }

    &.${props => props.activeClassName} {
        color: ${(props) => props.theme.color.primary };
        border-top: 2px solid ${(props) => props.theme.color.primary };
    }
`