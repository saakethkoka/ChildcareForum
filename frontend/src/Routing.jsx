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






import ProfileView from "./Profiles/ProfileComponents/Views/ViewOtherUser/OtherProfileView";


export default function Routing(){
	const checkLogin = () =>{
		console.log()
		if(!sessionStorage.getItem('userID') || sessionStorage.getItem('userID')==="-1"){
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
			</Routes>
		</Router>
    );

}
