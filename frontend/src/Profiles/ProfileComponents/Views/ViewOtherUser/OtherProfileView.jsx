import React from "react";
import { useState, useEffect } from "react";
import UserNavBar from "../UserNavBar"
import { TextField, Container, Paper, Card, Stack, Grid, InputAdornment, FormControl, OutlinedInput, FormHelperText, InputLabel, IconButton, Button, Chip, Alert } from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';
import { Avatar } from "@mui/material";
import { spacing } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
// react-bootstrap components






function ProfileView() {
  const textStyle = {margin: "10px auto"}
  const formStyle = {padding: 20, height: '105vh', width: '50vh', margin: "20px auto"}

  const testUser = [{id: 1, first_name: "John", last_name: "Doe", email: "test@gmail.com", password: "test123", username: "johndoe"}]

  const [first_Name, setFirstName] = useState("");
  const [last_Name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  const [emptyStatus, setEmptyStatus] = useState(false);
  const [matchPasswords, setMatchPasswords] = useState(true);



  useEffect(() => {
          setFirstName(testUser[0].first_name)
          setLastName(testUser[0].last_name)
          setUsername(testUser[0].username)
          setVerificationStatus("verified")
          
  }, []);

  return (
    <>
      <UserNavBar/>
      
      <Grid align = 'center'>
        <Paper style = {formStyle} elevation = {12}>
          <Grid align='center'>
            <Avatar ><BuildIcon/></Avatar>
            <h3>Username</h3>
          </Grid>
        <div>

          <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
            <InputLabel >Username</InputLabel>
            <OutlinedInput
              type="text"
              value={username}
              label="Username"
            />
          </FormControl>
          
          <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">First Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              value={first_Name}
              label="First Name"
            />
          </FormControl>


          <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Last Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              value={last_Name}
              label="Last Name"
            />
          </FormControl>
          <Grid align='center'>

          </Grid>

        </div>
        </Paper>
      </Grid>
     
    </>
  );
}

export default ProfileView;