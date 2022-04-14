import React from "react";
import { useState, useEffect } from "react";
import UserNavBar from "../UserNavBar"
import { TextField, Container, Paper, Card, Stack, Grid, InputAdornment, FormControl, OutlinedInput, FormHelperText, InputLabel, IconButton } from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';
import { Avatar } from "@mui/material";
import { spacing } from '@mui/system';
// react-bootstrap components






function UserProfile() {
  const textStyle = {margin: "10px auto"}
  const formStyle = {padding: 20, height: '100vh', width: '50vh', margin: "20px auto"}

  const testUser = [{id: 1, first_name: "John", last_name: "Doe", email: "test@gmail.com", password: "test123", username: "johndoe"}]

  const [first_Name, setFirstName] = useState("");
  const [last_Name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emptyFirst_Name, setEmptyFirstName] = useState(false);
  const [emptyLast_Name, setEmptyLastName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);



  useEffect(() => {
          setFirstName(testUser[0].first_name)
          setLastName(testUser[0].last_name)
          setUsername(testUser[0].username)
          setEmail(testUser[0].email)
          setPassword(testUser[0].password)

          console.log(first_Name)
  }, []);

  const test = false


  return (
    <>
      <UserNavBar/>
      <Grid align = 'center'>
        <Paper style = {formStyle} elevation = {12}>
          <Grid align='center'>
            <Avatar ><BuildIcon/></Avatar>
            <h3>Update Profile</h3>
          </Grid>
        <div>

          <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" required = {true} error = {emptyUsername}>
            <InputLabel >Username</InputLabel>
            <OutlinedInput
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              label="Username"
              onBlur={ () => {
                if(username.length===0){
                  setEmptyUsername(true)
                }
                else{
                  setEmptyUsername(false)
                }
              }}
            />
          </FormControl>
          
          <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" required = {true} error = {emptyFirst_Name}>
            <InputLabel htmlFor="outlined-adornment-password">First Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              value={first_Name}
              onChange={e => setFirstName(e.target.value)}
              label="First Name"
              onBlur={ () => {
                if(first_Name.length===0){
                  setEmptyFirstName(true)
                }
                else{
                  setEmptyFirstName(false)
                }
              }}
            />
          </FormControl>


          <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" required = {true} error = {!test}>
            <InputLabel htmlFor="outlined-adornment-password">Last Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              value={last_Name}
              onChange={e => setLastName(e.target.value)}
              label="Last Name"
            />
          </FormControl>

          <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" required = {true} error = {!test}>
            <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              label="Email"
            />
          </FormControl>

          <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" required = {true} error = {!test}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              label="Password"
            />
          </FormControl>


          <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" required = {true} error = {!test}>
            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              label="Password"
            />
          </FormControl>

        </div>
        </Paper>
      </Grid>
     
    </>
  );
}

export default UserProfile;