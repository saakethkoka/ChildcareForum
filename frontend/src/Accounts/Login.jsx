import React from 'react'
import { Navigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material/'
import { Repository } from '../API/repository';

export class Login extends React.Component {

    state = {
        username: "",
        password: "",
        invalidCred: false,
        jwtValue: "",
        error: false
    }

    repository = new Repository();
    
    async login(event) {
		event.preventDefault();
		event.stopPropagation();

		if (!(this.state.username && this.state.password)) {
			this.setState({ invalidCred: true });
			return;
		}
        try{
            const response = await this.repository.login(this.state.username, this.state.password)
            if (!response || response === 'error') {
                return;
            }

            if (response.status) {
                console.log(response.userID)
                sessionStorage.setItem("userID", response.userID.userID);
                sessionStorage.setItem("userBanned", response.userID.userBanned);
                sessionStorage.setItem("userDoctor", response.userID.userDoctor);
                sessionStorage.setItem("userModerator", response.userID.userModerator);
                sessionStorage.setItem("userVerified", response.userID.userVerified);
                this.setState({
                    username: "",
                    password: "",
                    invalidCred: false
                });
            }
            else {
                this.setState({ invalidCred: true });
            }
        }
        catch {
            this.setState({ error: true });
        }


	}


    render(){
        if (sessionStorage.getItem("userID")) {
			return <Navigate to="/posts" />;
		}
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
                        error={this.state.error}
                        fullWidth required
                        onChange={ e => this.setState({ username: e.target.value })}
                        style = {textStyle}
                    />
                    <TextField 
                        label = "Password"
                        value={ this.state.password }
                        type = 'password'
                        error={this.state.error}
                        fullWidth required
                        onChange={ e => this.setState({ password: e.target.value })}
                        style = {textStyle}
                    />
                    <Button 
                        type = "submit" 
                        color = "primary" 
                        variant='contained' 
                        fullWidth
                        onClick={e => this.login(e)}
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