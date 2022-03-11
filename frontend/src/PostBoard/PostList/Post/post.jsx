import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./post.css";
import { Box } from'@mui/material';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";



export class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            content: '',
            restricted: false
        }
    }

    render() {
        return(
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Author goes here
                    </Typography>
                    <Typography variant="h5" component="div">
                        {this.props.title}
                    </Typography>
                    <Typography variant="body1">
                        {this.props.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        )
    }
}