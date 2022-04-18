import React, {Fragment} from 'react';
import PostBoard from '../Common/PostBoard/PostBoard'
import  ProfileNavbar  from '../UserNavBar'

export const ProfileSavedPosts = () => { 

    return (
        <Fragment>
            <ProfileNavbar/>
            <PostBoard postType = {"userPostList"}/>
        </Fragment>
        
    );

    
}

