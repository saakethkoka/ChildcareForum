import React, { Fragment, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Fab from "@mui/material/Fab";
import Chip from "@mui/material/Chip";
import CommentIcon from '@mui/icons-material/Comment';
import {Dialog, DialogActions, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid/Grid";
import VerifiedIcon from '@mui/icons-material/Verified';

import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import { toggleBan } from '../../../kokaAPI';

const UserBan = (props) => {

    let user = props.user;
    let [verifiedStatus, setVerifiedStatus] = React.useState(false);


    const unBan = () => {
        toggleBan(user.userID)
        props.refreshBan()
    }



    let fab_styles = {
        margin: "0 .5rem",
        display: "inline-block"
    }

    return(
        <Grid width={"25%"} containers>
            <Card sx={{
                margin: "1rem",
                padding: 2,
                backgroundColor: '#fff',
                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.3)',
            }}>
                <CardContent sx={{
                    minHeight: 50,
                    maxHeight: 100,
                    width: '100%',
                    overflow: 'auto',
                }}>
                    <Typography variant="h5" component="div">
                        {user.username} {verifiedStatus && <VerifiedIcon color = "primary"/>}
                    </Typography>

                </CardContent>

                <CardActions>
                    <Fab color="error"
                         sx={fab_styles}
                         onClick={e => unBan(e)}
                         aria-label="Ban">
                        <CloseIcon/>
                    </Fab>
                </CardActions>
            </Card>
            
        </Grid>
    )
}

export default UserBan