import React, {Fragment} from 'react';
import PostBoard from '../../Common/PostBoard/PostBoard'
import  OtherProfileNavbar  from './OtherUserNavBar'
import { useParams } from "react-router-dom"

export const OtherProfilePosts = () => { 
    const { userId } = useParams();

    return (
        <Fragment>
            <OtherProfileNavbar/>
            <PostBoard postType = {"userPostList"} userId = {userId}/>
        </Fragment>
        
    );

    
}

