import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostBoard from "./PostBoard/PostBoard"
import  UserProfile from './Profiles/ProfileComponents/Views/UpdateUserProfile'
import {ProfilePosts} from "./Profiles/ProfileComponents//Views/ProfilePosts";
import ProfileBanned from "./Profiles/ProfileComponents/Views/ProfileBanned"
import {OtherProfilePosts} from "./Profiles/ProfileComponents/Views/ViewOtherUser/OtherProfilePosts"

export default function Routing(){
    return(
        <Router>
			<Routes>
				<Route path="/user/posts/:userId" exact element={<OtherProfilePosts />} />
                
                
                
				

			</Routes>
		</Router>
    );

}

//<Route path="/accounts/userProfile" exact element={<UserProfile />} />
//<Route path="/accounts/userPosts" exact element={<ProfilePosts/>} />