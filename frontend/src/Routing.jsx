import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostBoard from "./PostBoard/PostBoard"
import  UserProfile from './Profiles/ProfileComponents/Views/UserProfile'
import {ProfilePosts} from "./Profiles/ProfileComponents//Views/ProfilePosts";

export default function Routing(){
    return(
        <Router>
			<Routes>
				<Route path="/" exact element={<UserProfile />} />
                
                
                
				

			</Routes>
		</Router>
    );

}

//<Route path="/accounts/userProfile" exact element={<UserProfile />} />
//<Route path="/accounts/userPosts" exact element={<ProfilePosts/>} />