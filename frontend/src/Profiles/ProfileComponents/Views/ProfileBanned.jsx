import  UserBan from './ProfileBanList'
import { Grid, Button } from '@mui/material'
import React, { Fragment, useEffect, useState} from 'react';
import  ProfileNavbar  from '../UserNavBar'
import ResponsiveAppBar from '../ResponsiveAppBar';
import { getBannedUsers } from '../../../kokaAPI';
import { Typography } from '@mui/material';
import { Divider } from '@mui/material';


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
        
        <Fragment>
                <ResponsiveAppBar/>
                <Typography paddingTop={"10px"} align="center" >
                <h2>Banned Users</h2>
                    </Typography>
                    <Divider>
                        {getBannedUsers.length===0 && 
                        <Typography align='center'>
                            <h6>No Banned Users</h6>
                        </Typography>
                        }
                    </Divider>
                {bannedUsers.map((user) =>
                    <UserBan user={user} refreshBan = {refreshBan}/>
                )}
        </Fragment>
    )
}

export default ProfileBanned