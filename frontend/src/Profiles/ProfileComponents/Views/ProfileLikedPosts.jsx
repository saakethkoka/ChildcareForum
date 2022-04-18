import React, {Fragment} from 'react';
import PostBoard from '../Common/PostBoard/PostBoard'
import  ProfileNavbar  from '../UserNavBar'

export const ProfileLikedPosts = () => { 

    return (
        <Fragment>
            <ProfileNavbar/>
            <PostBoard postType = {"userPostList"}/>
        </Fragment>
        
    );

    
}

