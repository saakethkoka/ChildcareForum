import React, {Fragment, useEffect, useState } from 'react';
import PostBoard from '../../Common/PostBoard/PostBoard'
import  OtherProfileNavbar  from './OtherUserNavBar'
import { useParams } from "react-router-dom"
import { getPostsByID } from '../../../../kokaAPI';
import { Typography, Divider } from '@mui/material';

export const OtherProfilePosts = () => { 
    const { userID } = useParams();
    const [posts, setPosts] = useState("")

    useEffect(()=>{
        getPostsByID(userID).then(posts => {
            setPosts(posts)
        })
        return () => {
            setPosts({}); 
        };


    }, []);

    return (
        <Fragment>
            <OtherProfileNavbar userID = {userID}/>
            <Typography paddingTop={"10px"} align="center" >
                <h2>Posts</h2>
            </Typography>
            <Divider>
                {posts.length===0 && 
                <Typography align='center'>
                    <h6>No Posts</h6>
                </Typography>
                }
            </Divider>
            {posts !==0 && <PostBoard getPosts = {getPostsByID} userID = {userID}/>}
        </Fragment>
        
    );

    
}

