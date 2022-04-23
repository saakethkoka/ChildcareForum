import React, {Fragment} from 'react';
import PostBoard from '../../Common/PostBoard/PostBoard'
import  OtherProfileNavbar  from './OtherUserNavBar'
import { useParams } from "react-router-dom"
import { getPostsByID } from '../../../../kokaAPI';

export const OtherProfilePosts = () => { 
    const { userID } = useParams();

    return (
        <Fragment>
            <OtherProfileNavbar userID = {userID}/>
            <PostBoard getPosts = {getPostsByID} userID = {userID}/>
        </Fragment>
        
    );

    
}

