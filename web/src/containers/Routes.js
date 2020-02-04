import React from "react";
import { Router } from "@reach/router";
//pages
import Home from "../pages/Home";
import Forecasts from "../pages/Forecasts";
import Favorites from "../pages/Favorites";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

export default function Routes() {
	
	return (
		<Router>
			<Home path="/" />
			<Forecasts path="/forecasts" />
			<Favorites path="/favorites" />
			<SignUp path="/sign-up" />
			<Login path="/login" />
		</Router>
	);
}