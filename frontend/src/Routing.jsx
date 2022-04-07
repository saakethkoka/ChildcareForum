import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './Accounts/Login'
import { Register } from './Accounts/Register'

export default function Routing(){
    return(
        <Router>
			<Routes>
				<Route path="/" exact element={<Login />} />
				<Route path="/register" exact element={<Register />} />

			</Routes>
		</Router>
    );

}