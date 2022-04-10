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
import React from "react";

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
                        {request.username}
                    </Typography>
                    <Typography variant="body1">
                        {request.request}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Fab color="primary"
                         sx={fab_styles}
                         onClick={() => props.onApprove(request.id)}
                         aria-label="Approve">
                        <CheckIcon/>
                    </Fab>
                    <Fab color="error"
                         sx={fab_styles}
                         onClick={() => props.onDeny(request.id)}
                         aria-label="Deny">
                        <CloseIcon/>
                    </Fab>

                </CardActions>
            </Card>

        </Grid>
    )
}



export default function VerificationDashboard(){

    let [requests, setRequests] = React.useState(sample_requests);

    const approve = (id) => {
        let new_requests = [];
        for (let i = 0; i < requests.length; i++) {
            if (requests[i].id !== id) {
                new_requests.push(requests[i]);
            }
        }
        setRequests(new_requests);
    }

    const deny = (id) => {
        let new_requests = [];
        for (let i = 0; i < requests.length; i++) {
            if (requests[i].id !== id) {
                new_requests.push(requests[i]);
            }
        }
        setRequests(new_requests);
    }


    return(

        <Grid container
              sx={{
                  padding: '1rem',
                  backgroundColor: '#F3F6F9',
                  height: '100%',
              }}
              spacing={1}>
            {requests.length === 0 && <h1>No requests left to view</h1>}
            {requests.map(request => (
                <VerificationRequest onApprove={approve}
                                     onDeny={deny}
                                     request={request}/>
            ))}
        </Grid>
    )
}

