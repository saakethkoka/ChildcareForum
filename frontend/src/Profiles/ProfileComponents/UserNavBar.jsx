import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'
import React, {Fragment, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Navigate } from 'react-router-dom';


const ProfileNavbar = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const logOut = () =>{
        sessionStorage.removeItem("userID")
       
    }
    return (
        <Fragment>
            {!(sessionStorage.getItem("userID")) && <Navigate to = "/login"/>}
        <AppBar position = 'fixed'>
            <Toolbar>
                <Typography variant = 'h6' component='div' sx={{ flexGrow: 1}}>
                    <Button href="/" color = 'inherit'>
                        Home
                    </Button>
                </Typography>
                <Stack direction='row' spacing={2}>
                    <Button href="/accounts/userProfile" color = 'inherit'>Update Profile</Button>
                    <Button href="/accounts/userPosts" color = 'inherit'>Posts</Button>
                    <Button href="/accounts/liked" color = 'inherit'>Likes</Button>
                    <Button href="/accounts/disliked" color = 'inherit'>Dislikes</Button>
                    <Button href="/accounts/saved" color = 'inherit'>Saved Posts</Button>
                    {sessionStorage.getItem("userModerator") === "1" && <Button href="/accounts/ban" color = 'inherit'>Banned Users</Button>}
                    {sessionStorage.getItem("userModerator") === "1" && <Button href="/accounts/verification" color = 'inherit'>Verification Requests</Button>}
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                            <MenuItem>
                            <Avatar /> My account
                            </MenuItem>
                            <MenuItem 
                                onClick={logOut}
                            >
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                            </MenuItem>
                    </Menu>
                    
                </Stack>
            </Toolbar>
        </AppBar>
        </Fragment>
    )
}

export default ProfileNavbar