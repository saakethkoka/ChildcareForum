import  UserBan from './BanTemplate'
import { Grid, Button } from '@mui/material'
import  ProfileNavbar  from './UserNavBar'

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
        
        <Grid container
                  sx={{
                      padding: '1rem',
                      backgroundColor: '#F3F6F9',
                      height: '100%',
                  }}
                  spacing={1}>
                {console.log(listItems)}
                <ProfileNavbar/>
                {listItems.map((user) =>
                    <UserBan user={user}/>
                )}
        </Grid>
    )
}

export default ProfileBanned