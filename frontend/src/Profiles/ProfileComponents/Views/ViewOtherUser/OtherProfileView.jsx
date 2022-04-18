import React from "react";
import { useState, useEffect } from "react";
import { TextField, Container, Paper, Card, Stack, Grid, InputAdornment, FormControl, OutlinedInput, FormHelperText, InputLabel, IconButton, Button, Chip, Alert, Typography, Fab } from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';
import { Avatar } from "@mui/material";
import { spacing } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import OtherProfileNavbar from "./OtherUserNavBar";
// react-bootstrap components






function ProfileView() {
  const textStyle = {margin: "10px auto"}
  const formStyle = {padding: 20, height: '50vh', width: '50vh', margin: "20px auto"}

  const testUser = [{id: 1, first_name: "John", last_name: "Doe", email: "test@gmail.com", password: "test123", username: "johndoe", verificationStatus:true, banStatus: false}]

  const [first_Name, setFirstName] = useState("");
  const [last_Name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [banStatus, setBanStatus]  = useState(false)


  useEffect(() => {
          setFirstName(testUser[0].first_name)
          setLastName(testUser[0].last_name)
          setUsername(testUser[0].username)
          setBanStatus(testUser[0].banStatus)
          setVerificationStatus("verified")
    
  }, []);

  function toggleUserBan(){
    if(banStatus == true){
      setBanStatus(false)
    }
    else{
      setBanStatus(true)
    }
  }

  return (
    <>
      <OtherProfileNavbar/>
      
      <Grid align = 'center'>
        <Paper style = {formStyle} elevation = {12}>
          <Grid align='center'>
              <Typography variant="h5" component="div">
                        {username} {verificationStatus && <VerifiedIcon color = "primary"/>}
              </Typography>
          </Grid>
        <div>


          
          <TextField sx={{ m: 2, width: '25ch' }} variant="outlined"
            id="outlined-read-only-input"
            label="First Name"
            value={first_Name}
            InputProps={{
              readOnly: true,
            }}
          >
          </TextField>


          <TextField sx={{ m: 2, width: '25ch' }} variant="outlined"
            id="outlined-read-only-input"
            label="Last Name"
            value={last_Name}
            InputProps={{
              readOnly: true,
            }}
          >
          </TextField>
          
          
            
          <Grid align='center'>
            {!banStatus && <Fab color="error"
                //onClick={e => unBan(e)}
                aria-label="Ban"
                onClick={e=>toggleUserBan(e)}>
              <GavelRoundedIcon/>
            </Fab>}
            {banStatus && <item>
              <Button variant="contained"  color = "error" onClick={e=>toggleUserBan(e)}>
                Banned
              </Button>
              </item>}
          </Grid>

        </div>
        </Paper>
      </Grid>
     
    </>
  );
}

export default ProfileView;