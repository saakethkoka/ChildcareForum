import {AppBar, Box, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useEffect} from "react";
import Button from "@mui/material/Button";
import {common} from "@mui/material/colors";





export default function NavBar(props){




    return(
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{"margin-right": "1rem"}}>
                    Childcare Forum
                </Typography>
                <Button color="inherit">
                    Posts
                </Button>
                <Button color="inherit">
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}
