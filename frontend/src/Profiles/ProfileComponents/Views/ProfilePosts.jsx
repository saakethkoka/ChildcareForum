<<<<<<< HEAD
import React, {Fragment, useEffect, useState } from 'react';
import PostBoard from '../Common/PostBoard/PostBoard'
import  ProfileNavbar  from '../UserNavBar'
import { Repository } from '../../../API/repository'
import { getPostsByID } from "../../../kokaAPI"
import { Navigate } from 'react-router-dom'

export const ProfilePosts = () => { 
    const [posts, setPosts] = useState("")

    useEffect(()=>{
        getPostsByID(sessionStorage.getItem("userID")).then(posts => {
            setPosts(posts)
        })
        return () => {
            setPosts({}); 
          };

    }, []);



=======
import React, {Fragment} from 'react';
import PostBoard from '../Common/PostBoard/PostBoard'
import  ProfileNavbar  from '../UserNavBar'

export const ProfilePosts = () => { 
>>>>>>> 7a4857e (Added styling to user update)

    return (
        <Fragment>
            <ProfileNavbar/>
<<<<<<< HEAD
            <PostBoard getPosts = {getPostsByID} userID = {sessionStorage.getItem("userID")}/>
=======
            <PostBoard/>
>>>>>>> 7a4857e (Added styling to user update)
        </Fragment>
        
    );

    
<<<<<<< HEAD
}
=======
}

>>>>>>> 7a4857e (Added styling to user update)
