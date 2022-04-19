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
                    <Button href="/accounts/userProfile" color = 'inherit'>
                        Update Profile
                    </Button>
                    <Button href="/accounts/userPosts" color = 'inherit'>
                        Posts
                    </Button>
                    <Button href="/accounts/comments" color = 'inherit'>Comments</Button>
                    <Button href="/accounts/liked" color = 'inherit'>Likes</Button>
                    <Button href="/accounts/disliked" color = 'inherit'>Dislikes</Button>
                    <Button href="/accounts/saved" color = 'inherit'>Saved Posts</Button>
                     <Button href="/accounts/ban" color = 'inherit'>Banned Users</Button>
                     <Button href="/accounts/verification" color = 'inherit'>Verification Requests</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default ProfileNavbar