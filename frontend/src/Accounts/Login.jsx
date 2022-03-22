import React from 'react'
import { Grid, Paper, Avatar } from '@mui/material/'
export class Login extends React.Component {

    state = {
        username: "",
        password: "",
        invalidCred: false,
        jwtValue: "",
    }

    //api login
    /*async login(event) {
        

    }*/

    render(){
        const formStyle = {padding: 20, height: '70vh', width: 290, margin: "20px auto"}
        return(
            <Grid>
                <Paper style = {formStyle}>
                    <Grid align = 'center'>
                        <h2>Sign in</h2>
                    </Grid>
                
                </Paper>
            </Grid>
        )
    }
}

export default Login