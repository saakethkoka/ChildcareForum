import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './Accounts/Login'
import { Register } from './Accounts/Register'
import PostBoard from "./PostBoard/PostBoard";

import ProfileView from "./Profiles/ProfileComponents/Views/ViewOtherUser/OtherProfileView";


import ProfileView from "./Profiles/ProfileComponents/Views/ViewOtherUser/OtherProfileView";


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
<<<<<<< HEAD
=======
				<Route path="/user/profile/:userId" exact element={<ProfileView />} />
				<Route path="/user/posts/:userId" exact element={<OtherProfilePosts />} />
                <Route path="/accounts/userProfile" exact element={<UserProfile />} />
				<Route path="/accounts/userPosts" exact element={<ProfilePosts />} />
				<Route path="/accounts/ban" exact element={<ProfileBanned />} />
				
                
                
				
>>>>>>> a1f1bed (changes)

				<Route path="/" element={checkLogin()} />
				<Route path="/posts" exact element={<PostBoard />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" exact element={<Register />} />
			</Routes>
		</Router>
    );

}
