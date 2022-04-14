<<<<<<< HEAD
import  UserBan from './ProfileBanList'
import { Grid, Button } from '@mui/material'
import React, { Fragment, useEffect} from 'react';
=======
import  UserBan from '../BanTemplate'
import { Grid, Button } from '@mui/material'
>>>>>>> 7a4857e (Added styling to user update)
import  ProfileNavbar  from '../UserNavBar'

const ProfileBanned = () => {


<<<<<<< HEAD
    useEffect(() => {
        
    });




=======
>>>>>>> 7a4857e (Added styling to user update)
    const listItems = [
        {
            id: 1,
            username: "John Doe",
<<<<<<< HEAD
            verified: true,
=======
>>>>>>> 7a4857e (Added styling to user update)
            },
        {
            id: 2,
            username: "Dohn Joe",
<<<<<<< HEAD
            verified: false
=======
>>>>>>> 7a4857e (Added styling to user update)
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