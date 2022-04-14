import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'

const ProfileNavbar = (props) => {
    console.log(props)
    return (
        <AppBar position = 'static'>
            <Toolbar>
                <Typography variant = 'h6' component='div' sx={{ flexGrow: 1}}>
                    <Button href="/" color = 'inherit'>
                        Home
                    </Button>
                </Typography>
                <Stack direction='row' spacing={2}>
                    {props.auth && <Button color = 'inherit'>Verification Requests</Button>}
                    <Button href="/accounts/userProfile" color = 'inherit'>
                        Update Profile
                    </Button>
                    <Button href="/accounts/userPosts" color = 'inherit'>
                        User Posts
                    </Button>
                    <Button href="/accounts/" color = 'inherit'>Comments</Button>
                    <Button color = 'inherit'>Like/Dislike</Button>
                    <Button color = 'inherit'>Saved Posts</Button>
                    {props.auth && <Button color = 'inherit'>Banned Users</Button>}
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default ProfileNavbar