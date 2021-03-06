import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom';
import {Logout} from "@mui/icons-material";
import { Navigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import {useEffect} from "react";

const pages_default = [['Update Profile', '/accounts/userProfile'],
    ['My Posts', '/accounts/userPosts'],
    ['Likes', '/accounts/liked'],
    ['Dislikes', '/accounts/disliked'],
    ['Saved Posts', '/accounts/saved'],];

const pages_admin = [['Update Profile', '/accounts/userProfile'],
    ['My Posts', '/accounts/userPosts'],
    ['Likes', '/accounts/liked'],
    ['Dislikes', '/accounts/disliked'],
    ['Saved Posts', '/accounts/saved'],
    ['Verification Requests', '/accounts/verification'],
    ['Banned Users', '/accounts/ban'],
];

const settings = ['Logout'];

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [pages, setPages] = React.useState(pages_default);

    useEffect(() => {
        if (sessionStorage.getItem("userModerator") === "1") {
            setPages(pages_admin);
        }
    }, []);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const logOut = () =>{
        sessionStorage.removeItem("userID")
        sessionStorage.removeItem("userModerator");
        sessionStorage.removeItem("userDoctor");
        sessionStorage.removeItem("userBanned");
        sessionStorage.removeItem("userVerified");
        handleCloseUserMenu();
    }


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuClick = (event, index) => {
        // Console log the button key which called this function:
        handleCloseNavMenu();
    };

    return (
        <AppBar position="fixed">
            {!(sessionStorage.getItem("userID")) && <Navigate to = "/login"/>}
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to={'/'}
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color:"white", textDecoration:"none" }}
                    >
                        <a href={'/'} style={{textDecoration:"none", color:"white"}} >
                            <img src="https://saaketh-koka-2021-demo.s3.us-east-2.amazonaws.com/IMG_0035.png"
                                 width={75}/>
                        </a>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page[0]}>
                                    <Typography component={Link}
                                                to={page[1]}
                                                sx={{"textDecoration": "none", "color": "inherit"}}
                                                textAlign="center">{page[0]}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <a href={'/'} style={{textDecoration:"none", color:"white"}} >
                            <img src="https://saaketh-koka-2021-demo.s3.us-east-2.amazonaws.com/IMG_0035.png"
                                 width={75}/>
                        </a>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                href={page[1]}
                            >
                                {page[0]}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar> <PersonIcon/>  </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={logOut}>
                                <Logout textAlign="center"/>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;