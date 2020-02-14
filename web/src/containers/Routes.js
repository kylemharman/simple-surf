import React from "react";
import { Router } from "@reach/router";
//pages
import Home from "../pages/Home";
import Forecasts from "../pages/Forecasts";
import Favorites from "../pages/Favorites";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Location from "../pages/Location";



export default function Routes(props) {
	return (
		<React.Fragment>
			{ props.user ?
				<Router>
					<Location path="/location/:id" user={props.user} addToFavorites={(location) => props.addToFavorites(location)} />
					<Favorites path="/favorites" user={props.user} /> 
					<Forecasts path="/forecasts" />
					<Home path="/" />
				</Router>
				:
				<Router>
					<Home path="/" />
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