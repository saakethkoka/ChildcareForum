import React, {Fragment, useEffect, useState } from 'react';
import PostBoard from '../Common/PostBoard/PostBoard'
import  ProfileNavbar  from '../UserNavBar'
import { Repository } from '../../../API/repository'
import { getPostsByID, getSavedPostsByID } from "../../../kokaAPI"
import { Navigate } from 'react-router-dom'

export const ProfileSavedPosts = () => { 
    const [posts, setPosts] = useState("")

    useEffect(()=>{
        

    }, []);




    return (
        <Fragment>
            <ProfileNavbar/>
            <PostBoard getPosts = {getSavedPostsByID} userID = {sessionStorage.getItem("userID")} saved = {true}/>
        </Fragment>
        
    );

    
}
