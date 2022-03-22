import React from 'react'
import { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material/'

export const Register=()=>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validFirstName, setValidFirstName] = useState(true);
    const [validLastName, setValidLastName] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validUsername, setValidUsername] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [complete, setComplete] = useState(false);


    /*function register(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!(firstName && lastName && email && username && password)) {
            return;
        }

        let account = {
            name: `${firstName} ${lastName}`,
            userName: username,
            email,
            password
        };

        accountRepository.register(account);

        setComplete(true);
    }
    
    function validateEmail() {
        let emailPattern = /[\w]+@[\w]+\.[\w]{2,}/;
        if (emailPattern.test(email))
            return true;
        else
            return false;
    }

    if (complete) {
        return (<Redirect to="/login" push/>)
    }
    */

    const formStyle = {padding: 20, height: '80vh', width: 290, margin: "20px auto"}
    const textStyle = {margin: "10px auto"}
    return(
        <Grid>
            <Paper style = {formStyle}>
                <Grid align = "center">
                    <h2>
                        Sign Up
                    </h2>
                </Grid>
                <form>
                <TextField 
                        type = "text"
                        label = "First Name" 
                        value={ firstName }
                        onChange={ e => setFirstName(e.target.value) }
                        style = {textStyle}
                />
                <TextField 
                        type = "text"
                        label = "Last Name" 
                        value={ lastName }
                        onChange={ e => setLastName(e.target.value) }
                        style = {textStyle}
                />
                <TextField 
                        type="text"
                        label = "Username" 
                        value={ username }
                        onChange={ e => setUsername(e.target.value) }
                        style = {textStyle}
                />
                <TextField 
                        label = "Email" 
                        value={ email }
                        onChange={ e => setEmail(e.target.value) }
                        style = {textStyle}
                        type="email"
                />   
                <TextField 
                        label = "Password" 
                        value={ password }
                        type="password"
                        onChange={ e => setPassword(e.target.value) }
                        style = {textStyle}
                /> 
                <TextField 
                        label = "Confrim Password" 
                        value={ password }
                        type="password"
                        onChange={ e => setPassword(e.target.value) }
                        style = {textStyle}
                />
                </form>
                <Button 
                        type = "submit" 
                        color = "primary" 
                        variant='contained' 
                        fullWidth
                    >
                        Register
                    </Button>
            </Paper>
            
        </Grid>
    )
}



export default Register;