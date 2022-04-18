<<<<<<< HEAD
<<<<<<< HEAD
import  UserBan from './ProfileBanList'
import { Grid, Button } from '@mui/material'
import React, { Fragment, useEffect} from 'react';
=======
import  UserBan from '../BanTemplate'
import { Grid, Button } from '@mui/material'
>>>>>>> 7a4857e (Added styling to user update)
=======
import  UserBan from './ProfileBanList'
import { Grid, Button } from '@mui/material'
import React, { Fragment, useEffect} from 'react';
>>>>>>> be2a641 (updated banned view)
import  ProfileNavbar  from '../UserNavBar'

const ProfileBanned = () => {


<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> be2a641 (updated banned view)
    useEffect(() => {
        
    });




<<<<<<< HEAD
=======
>>>>>>> 7a4857e (Added styling to user update)
=======
>>>>>>> be2a641 (updated banned view)
    const listItems = [
        {
            id: 1,
            username: "John Doe",
<<<<<<< HEAD
<<<<<<< HEAD
            verified: true,
=======
>>>>>>> 7a4857e (Added styling to user update)
=======
            verified: true,
>>>>>>> be2a641 (updated banned view)
            },
        {
            id: 2,
            username: "Dohn Joe",
<<<<<<< HEAD
<<<<<<< HEAD
            verified: false
=======
>>>>>>> 7a4857e (Added styling to user update)
=======
            verified: false
>>>>>>> be2a641 (updated banned view)
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