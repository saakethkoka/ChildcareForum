import React, {Fragment, useEffect, useState } from 'react';
import PostBoard from '../Common/PostBoard/PostBoard'
import  ProfileNavbar  from '../UserNavBar'
import { Repository } from '../../../API/repository'
import { getPostsByID, getLikedPostsByID, getDislikedPostsByID} from "../../../kokaAPI"
import { Navigate } from 'react-router-dom'

export const ProfileDislikedPosts = () => { 

    return (
        <Fragment>
            <ProfileNavbar/>
            <PostBoard getPosts = {getDislikedPostsByID} userID = {sessionStorage.getItem("userID")}/>
        </Fragment>
        
    );

    
}

