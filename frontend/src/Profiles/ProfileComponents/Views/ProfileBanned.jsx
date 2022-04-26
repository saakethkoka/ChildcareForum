import  UserBan from './ProfileBanList'
import { Grid, Button } from '@mui/material'
import React, { Fragment, useEffect, useState} from 'react';
import  ProfileNavbar  from '../UserNavBar'
import { getBannedUsers } from '../../../kokaAPI';

function ProfileBanned() {

    const [bannedUsers, setBannedUsers] = useState([])
    const [count, setCount] = useState(0)
    const refreshBan = () =>{
        setCount(count+1)
        
    }

    useEffect(() => {
        console.log("test2")
        getBannedUsers().then(bannedUsers => {setBannedUsers(bannedUsers)
        console.log("test3")})
    }, [count]);


    return (
        
        <Grid container>
                <ProfileNavbar/>
                {bannedUsers.map((user) =>
                    <UserBan user={user} refreshBan = {refreshBan}/>
                )}
        </Grid>
    )
}

export default ProfileBanned