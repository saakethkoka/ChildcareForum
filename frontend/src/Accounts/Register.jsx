import React from 'react'
import { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material/'
import { Navigate } from 'react-router-dom';
import { Repository } from '../API/repository';

export const Register=()=>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [validFirstName, setValidFirstName] = useState(true);
    const [validLastName, setValidLastName] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validUsername, setValidUsername] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [complete, setComplete] = useState(false);

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    const accountRepository = new Repository();


    function register(event) {
        event.preventDefault();
        event.stopPropagation();

        console.log()
        const valid_email = validateEmail();
        setFirstNameError(firstName === "");
        setLastNameError(lastName === "");
        setEmailError(valid_email === false);
        setUsernameError(username === "");
        setPasswordError(password === "" || password !== passwordConfirm);

        if (!(firstName && lastName && email && username && password) || (password !== passwordConfirm)) {
            return;
        }

        let account = {
            username: username,
            first_name: firstName,
            last_name: lastName,
            email,
            password
        };
        try{
            accountRepository.register(account)
                .then(r => setComplete(true))
                .catch((e)=>{
                setUsernameError(true);
                alert("Username already exists");
            });

        }
        catch{

        }


        
    }
    
    function validateEmail() {
        let emailPattern = /[\w]+@[\w]+\.[\w]{2,}/;
        if (emailPattern.test(email))
            return true;
        else
            return false;
    }

    if (complete) {
        return (<Navigate to="/" push/>)
    }
    

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
                        error={firstNameError}
                        value={ firstName }
                        onChange={ e => setFirstName(e.target.value) }
                        style = {textStyle}
                />
                <TextField 
                        type = "text"
                        label = "Last Name" 
                        value={ lastName }
                        error={lastNameError}
                        onChange={ e => setLastName(e.target.value) }
                        style = {textStyle}
                />
                <TextField 
                        type="text"
                        label = "Username" 
                        value={ username }
                        error={usernameError}
                        onChange={ e => setUsername(e.target.value) }
                        style = {textStyle}
                />
                <TextField 
                        label = "Email" 
                        value={ email }
                        error={emailError}
                        onChange={ e => setEmail(e.target.value) }
                        style = {textStyle}
                        type="email"
                />   
                <TextField 
                        label = "Password" 
                        value={ password }
                        error={passwordError}
                        type="password"
                        onChange={ e => setPassword(e.target.value) }
                        style = {textStyle}
                /> 
                <TextField 
                        label = "Confrim Password" 
                        value={ passwordConfirm }
                        error={passwordError}
                        type="password"
                        onChange={ e => setPasswordConfirm(e.target.value) }
                        style = {textStyle}
                />
                </form>
                <Button 
                        type = "submit" 
                        color = "primary" 
                        variant='contained' 
                        fullWidth
                        onClick={ e => register(e)}
                    >
                        Register
                    </Button>
            </Paper>
            
        </Grid>
    )
}



export default Register;