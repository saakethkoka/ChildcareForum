import React, {Fragment, useEffect, useState } from 'react';
import PostBoard from '../Common/PostBoard/PostBoard'
import  ProfileNavbar  from '../UserNavBar'
import { Repository } from '../../../API/repository'
import { getPostsByID, getLikedPostsByID } from "../../../kokaAPI"
import { Navigate } from 'react-router-dom'

export const ProfileLikedPosts = () => { 

    useEffect(()=>{
        
    })

    return (
        <Fragment>
            <ProfileNavbar/>
            <PostBoard getPosts = {getLikedPostsByID} userID = {sessionStorage.getItem("userID")}/>
        </Fragment>
        
    );

    
}

