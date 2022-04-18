import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'

const OtherProfileNavbar = (props) => {
    const userId = props.userId
    return (
        <AppBar position = 'static'>
            <Toolbar>
                <Typography variant = 'h6' component='div' sx={{ flexGrow: 1}}>
                    <Button href="/" color = 'inherit'>
                        Home
                    </Button>
                </Typography>
                <Stack direction='row' spacing={2}>
                    <Button href={`/user/information/${userId}`} color = 'inherit'>
                        User Info
                    </Button>
                    <Button href={`/user/posts/${userId}`} color = 'inherit'>
                        Posts
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default OtherProfileNavbar