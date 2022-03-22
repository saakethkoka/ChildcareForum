import React from 'react'
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material/'
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
        const formStyle = {padding: 20, height: '50vh', width: 290, margin: "20px auto"}
        const textStyle = {margin: "10px auto"}
        return(
            <Grid>
                <Paper style = {formStyle}>
                    <Grid align = 'center'>
                        <h2>Sign in</h2>
                    </Grid>
                    <TextField 
                        label = "Username" 
                        value={ this.state.username } 
                        fullWidth required
                        onChange={ e => this.setState({ username: e.target.value })}
                        style = {textStyle}
                    />
                    <TextField 
                        label = "Password" 
                        value={ this.state.password } 
                        type = 'password'
                        fullWidth required
                        onChange={ e => this.setState({ password: e.target.value })}
                        style = {textStyle}
                    />
                    <Button 
                        type = "submit" 
                        color = "primary" 
                        variant='contained' 
                        fullWidth
                    >
                        Sign in
                    </Button>
                    <span>Need an account? </span>
                        <a href="/register">Register here</a>
                </Paper>
            </Grid>
        )
    }
}

export default Login