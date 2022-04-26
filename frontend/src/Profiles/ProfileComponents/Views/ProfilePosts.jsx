import React, {Fragment, useEffect, useState } from 'react';
import PostBoard from '../Common/PostBoard/PostBoard'
import  ProfileNavbar  from '../UserNavBar'
import { Repository } from '../../../API/repository'
import { getPostsByID } from "../../../kokaAPI"
import { Navigate } from 'react-router-dom'
import ResponsiveAppBar from '../ResponsiveAppBar';
import { Typography } from '@mui/material';
import { Divider } from '@mui/material';

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
            <ResponsiveAppBar/>
            <Typography paddingTop={"10px"} align="center" >
                <h2>My Posts</h2>
            </Typography>
            <Divider>
                {posts.length===0 && 
                <Typography align='center'>
                    <h6>No Posts</h6>
                </Typography>
                }
            </Divider>
            
            {posts.length!==0 && <PostBoard getPosts = {getPostsByID} userID = {sessionStorage.getItem("userID")}/>
            }
            
        </Fragment>
        
    );

    
}
