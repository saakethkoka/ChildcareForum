import Grid from "@mui/material/Grid/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Fab from "@mui/material/Fab";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import React, { Fragment, useEffect } from "react";
import { getRequests, approveRequestByID, denyRequestByID } from "../kokaAPI"
import  ProfileNavbar  from '../Profiles/ProfileComponents/UserNavBar'
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from '@mui/material';
import ResponsiveAppBar from "../Profiles/ProfileComponents/ResponsiveAppBar";
import { Divider } from '@mui/material';



let sample_requests = [
    {
        "id": "1",
        "user_id": "1",
        "username": "skoka",
        "request": "I am a doctor pls approve me pls pls"
    },
    {
        "id": "2",
        "user_id": "2",
        "username": "skoka22",
        "request": "I am teacher pls approve me pls pls"
    }
]


function VerificationRequest(props) {
    let request = props.request;




    let fab_styles = {
        margin: "0 .5rem",
        display: "inline-block"
    }

    return (
        <Grid md={6} sm={12} containers>
            <Card sx={{
                margin: "1rem",
                padding: 2,
                backgroundColor: '#fff',
                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.3)',
            }}>
                <CardContent sx={{
                    minHeight: 150,
                    maxHeight: 300,
                    overflow: 'auto',
                }}>
                    <Typography variant="h5" component="div">
                        {request.first_name} {request.last_name} -
                        <Link href={`/user/profile/${request.userID}`}>{request.username}</Link> {request.isVerified === "1" && <VerifiedIcon color="primary"/>}

                    </Typography>
                    <Typography variant="body1">
                        {request.requestText}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Fab color="primary"
                         sx={fab_styles}
                         onClick={() => props.onApprove(request.userID)}
                         aria-label="Approve">
                        <CheckIcon/>
                    </Fab>
                    <Fab color="error"
                         sx={fab_styles}
                         onClick={() => props.onDeny(request.userID)}
                         aria-label="Deny">
                        <CloseIcon/>
                    </Fab>

                </CardActions>
            </Card>

        </Grid>
    )
}



export default function VerificationDashboard(){

    let [requests, setRequests] = React.useState([]);
    const [count, setCount] = React.useState(0)
    const refreshRequest = () =>{
      setCount(count+1)
    }

    useEffect(() => {
        getRequests().then(requests => {setRequests(requests)})
    }, [count]);

    const approve = (id) => {
        approveRequestByID(id).then(getRequests().then(requests => {
            getRequests().then(requests2 => {setRequests(requests2)});
        }));

    }

    const deny = (id) => {
        denyRequestByID(id).then(getRequests().then(requests => {
            getRequests().then(requests2 => {setRequests(requests2)});
        }));
    }


    return(
        <Fragment>
        <ResponsiveAppBar/>
        <Typography paddingTop={"10px"} align="center" >
                <h2>Incoming Requests</h2>
            </Typography>
            <Divider>
                {requests.length===0 && 
                <Typography align='center'>
                    <h6>No Requests</h6>
                </Typography>
                }
            </Divider>
        <Grid container
              sx={{
                  padding: '1rem',
                  backgroundColor: '#F3F6F9',
                  height: '100%',
              }}
              spacing={1}>
            {requests.map(request => (
                <VerificationRequest onApprove={approve}
                                     onDeny={deny}
                                     request={request}/>
            ))}
        </Grid>
        </Fragment>
    )
}

