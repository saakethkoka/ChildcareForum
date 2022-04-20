import React, {Fragment} from 'react';
import PostBoard from '../Common/PostBoard/PostBoard'
import  ProfileNavbar  from '../UserNavBar'

export const ProfilePosts = () => { 

    return (
        <Fragment>
            <ProfileNavbar/>
            <PostBoard/>
        </Fragment>
        
    );

    
}

