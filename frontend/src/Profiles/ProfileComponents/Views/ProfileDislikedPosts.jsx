import React, {Fragment, useEffect, useState } from 'react';
import PostBoard from '../Common/PostBoard/PostBoard'
import  ProfileNavbar  from '../UserNavBar'
import { Repository } from '../../../API/repository'
import { getPostsByID, getLikedPostsByID, getDislikedPostsByID} from "../../../kokaAPI"
import { Navigate } from 'react-router-dom'
import ResponsiveAppBar from '../ResponsiveAppBar';
import { Divider, Typography } from '@mui/material';

export const ProfileDislikedPosts = () => {
    const [posts, setPosts] = useState("")

    useEffect(()=>{
        getDislikedPostsByID(sessionStorage.getItem("userID")).then(posts => {
            setPosts(posts)
        })
        return () => {
            setPosts({}); 
          };

    }, []);

    return (
        <Fragment>
            <ResponsiveAppBar/>
            <Typography paddingTop={"10px"} align="center" >
                <h2>My Disliked Posts</h2>
            </Typography>
            <Divider>
                {posts.length===0 && 
                <Typography align='center'>
                    <h6>No Disliked Posts</h6>
                </Typography>
                }
            </Divider>
            <PostBoard getPosts = {getDislikedPostsByID} userID = {sessionStorage.getItem("userID")}/>
        </Fragment>
        
    );

    
}

