import  UserBan from './ProfileBanList'
import { Grid, Button } from '@mui/material'
import React, { Fragment, useEffect} from 'react';
import  ProfileNavbar  from '../UserNavBar'

const ProfileBanned = () => {


    useEffect(() => {
        
    });




    const listItems = [
        {
            id: 1,
            username: "John Doe",
            verified: true,
            },
        {
            id: 2,
            username: "Dohn Joe",
            verified: false
            }
    ]

    return (
        
        <Grid container>
                {console.log(listItems)}
                <ProfileNavbar/>
                {listItems.map((user) =>
                    <UserBan user={user}/>
                )}
        </Grid>
    )
}

export default ProfileBanned