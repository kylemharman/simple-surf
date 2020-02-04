import React from "react";
import { Router } from "@reach/router";
//pages
import Home from "../pages/Home";
import Forecasts from "../pages/Forecasts";
import Favorites from "../pages/Favorites";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

export default function Routes(props) {
	return (
		<React.Fragment>
			{ props.user ?
				<Router>
					<Favorites path="/favorites" user={props.user} /> 
				</Router>
				:
				<Router>
					<Home path="/" />
					<Forecasts path="/forecasts" />
					<SignUp 
						path="/sign-up" 
						signUp={ (userName, userEmail, userPassword) => props.signUp(userName,userEmail, userPassword)} />
					<Login 
						path="/login" 
						login={ (userEmail, userPassword) => props.login(userEmail, userPassword)}
						loginMessage={props.loginMessage}/>
				</Router>
			}
		</React.Fragment>
	);
}