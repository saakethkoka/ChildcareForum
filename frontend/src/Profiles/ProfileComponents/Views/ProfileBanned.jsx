import  UserBan from '../BanTemplate'
import { Grid, Button } from '@mui/material'
import  ProfileNavbar  from '../UserNavBar'

const ProfileBanned = () => {


    const listItems = [
        {
            id: 1,
            username: "John Doe",
            },
        {
            id: 2,
            username: "Dohn Joe",
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