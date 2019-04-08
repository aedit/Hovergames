import React from "react";
import { Game } from "./containers";
import { Redirect } from "react-router-dom";

const Dodge = () => {
	const isLoggedin =
		sessionStorage.hasOwnProperty("token") ||
		sessionStorage.hasOwnProperty("guestid");
	return !isLoggedin ? (
		<Redirect to="/" />
	) : (
		<Game boardSize={11} playerSize={25} />
	);
};

export default Dodge;
