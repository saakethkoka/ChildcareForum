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




    return (
        <Fragment>
            <ProfileNavbar/>
            <PostBoard getPosts = {getPostsByID} userID = {sessionStorage.getItem("userID")}/>
        </Fragment>
        
    );

    
}
