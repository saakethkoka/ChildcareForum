import React, {Fragment, useState} from "react";
import {Navigate} from "react-router-dom";
import {Paper, TextField} from "@mui/material";
import Grid from "@mui/material/Grid/Grid";
import Button from "@mui/material/Button";
import {requestByID} from "../kokaAPI";
import ResponsiveAppBar from "../Profiles/ProfileComponents/ResponsiveAppBar";


export default function VerificationRequest(){
    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const onSumbit = (e) => {
        e.preventDefault();
        requestByID(text).then(() => {
            console.log('success');
            setText('');
        });
    }
    if (!sessionStorage.getItem("userID")) {
        return <Navigate to="/login" />;
    }
    const formStyle = {padding: 20, height: '50vh', width: 290, margin: "20px auto"}
    const textStyle = {margin: "10px auto"}
    return(
        <Fragment>
            <ResponsiveAppBar/>
            <Grid>
                <Paper style = {formStyle}>
                    <Grid align = 'center'>
                        <h2>Request Verification</h2>
                    </Grid>
                    <TextField
                        label = "Reason for verification"
                        value={ text }
                        multiline
                        minRows={4}
                        fullWidth required
                        onChange={handleChange}
                        style = {textStyle}
                    />
                    <Button
                        type = "submit"
                        color = "primary"
                        variant='contained'
                        fullWidth
                        onClick={onSumbit}
                    >
                        Send Request
                    </Button>
                </Paper>
            </Grid>
        </Fragment>
    )


}