import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'

const OtherProfileNavbar = (props) => {
    const userID = props.userID
    return (
        <AppBar position = 'fixed'>
            <Toolbar>
                <Typography variant = 'h6' component='div' sx={{ flexGrow: 1}}>
                    <Button href="/" color = 'inherit'>
                        Home
                    </Button>
                </Typography>
                <Stack direction='row' spacing={2}>
                    <Button href={`/user/profile/${userID}`} color = 'inherit'>
                        User Info
                    </Button>
                    <Button href={`/user/posts/${userID}`} color = 'inherit'>
                        Posts
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default OtherProfileNavbar