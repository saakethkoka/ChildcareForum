import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './Accounts/Login'
import { Register } from './Accounts/Register'
import PostBoard from "./PostBoard/PostBoard";

import ProfileView from "./Profiles/ProfileComponents/Views/ViewOtherUser/OtherProfileView";
import UserProfile from "./Profiles/ProfileComponents/Views/UpdateUserProfile"
import {ProfilePosts} from "./Profiles/ProfileComponents//Views/ProfilePosts";
import ProfileBanned from "./Profiles/ProfileComponents/Views/ProfileBanned"
import {OtherProfilePosts} from "./Profiles/ProfileComponents/Views/ViewOtherUser/OtherProfilePosts"
import { ProfileLikedPosts } from "./Profiles/ProfileComponents/Views/ProfileLikedPosts";
import { ProfileDislikedPosts } from "./Profiles/ProfileComponents/Views/ProfileDislikedPosts";









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
				<Route path="/accounts/userProfile" exact element={<UserProfile/>}/>
				<Route path="/accounts/userPosts" exact element = {<ProfilePosts/>}/>
				<Route path="/accounts/liked" exact element ={<ProfileLikedPosts/>}/>
				<Route path="/accounts/disliked" exact element ={<ProfileDislikedPosts/>}/>
				<Route path="/accounts/ban" exact element ={<ProfileBanned/>}/>
				<Route path="/user/profile/:userID" exact element = {<ProfileView/>}/>
				<Route path="/user/posts/:userID" exact element = {<OtherProfilePosts/>}/>
			</Routes>
		</Router>
    );

}
