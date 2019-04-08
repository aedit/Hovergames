import React from "react";
import { Redirect } from "react-router-dom";

const Pong = () => {
	const isLoggedin =
		sessionStorage.hasOwnProperty("token") ||
		sessionStorage.hasOwnProperty("guestid");
	return !isLoggedin ? <Redirect to="/" /> : <div>PONG</div>;
};

export default Pong;
