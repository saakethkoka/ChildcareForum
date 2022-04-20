import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './Accounts/Login'
import { Register } from './Accounts/Register'
import PostBoard from "./PostBoard/PostBoard";

export default function Routing(){
	const checkLogin = () =>{
		console.log()
		if(!sessionStorage.getItem('userID')){
			return <Login/>
		}
		return <PostBoard/>;
	}

    return(
        <Router>
			<Routes>

				<Route path="/" element={checkLogin()} />
				<Route path="/posts" exact element={<PostBoard />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" exact element={<Register />} />
			</Routes>
		</Router>
    );

}
