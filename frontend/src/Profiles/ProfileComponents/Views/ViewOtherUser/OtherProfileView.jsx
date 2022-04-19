import React from "react";
import { useState, useEffect } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { TextField, Container, Paper, Card, Stack, Grid, InputAdornment, FormControl, OutlinedInput, FormHelperText, InputLabel, IconButton, Button, Chip, Alert, Typography, Fab } from "@mui/material";
=======
import UserNavBar from "../UserNavBar"
import { TextField, Container, Paper, Card, Stack, Grid, InputAdornment, FormControl, OutlinedInput, FormHelperText, InputLabel, IconButton, Button, Chip, Alert } from "@mui/material";
>>>>>>> 6a7d8e2 (adding ui for view other profile)
=======
import { TextField, Container, Paper, Card, Stack, Grid, InputAdornment, FormControl, OutlinedInput, FormHelperText, InputLabel, IconButton, Button, Chip, Alert, Typography, Fab } from "@mui/material";
>>>>>>> a1f1bed (changes)
import BuildIcon from '@mui/icons-material/Build';
import { Avatar } from "@mui/material";
import { spacing } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
<<<<<<< HEAD
<<<<<<< HEAD
import OtherProfileNavbar from "./OtherUserNavBar";
=======
>>>>>>> 6a7d8e2 (adding ui for view other profile)
=======
import OtherProfileNavbar from "./OtherUserNavBar";
>>>>>>> a1f1bed (changes)
// react-bootstrap components






function ProfileView() {
  const textStyle = {margin: "10px auto"}
<<<<<<< HEAD
<<<<<<< HEAD
  const formStyle = {padding: 20, height: '50vh', width: '50vh', margin: "20px auto"}

  const testUser = [{id: 1, first_name: "John", last_name: "Doe", email: "test@gmail.com", password: "test123", username: "johndoe", verificationStatus:true, banStatus: false}]
=======
  const formStyle = {padding: 20, height: '105vh', width: '50vh', margin: "20px auto"}

  const testUser = [{id: 1, first_name: "John", last_name: "Doe", email: "test@gmail.com", password: "test123", username: "johndoe"}]
>>>>>>> 6a7d8e2 (adding ui for view other profile)
=======
  const formStyle = {padding: 20, height: '50vh', width: '50vh', margin: "20px auto"}

  const testUser = [{id: 1, first_name: "John", last_name: "Doe", email: "test@gmail.com", password: "test123", username: "johndoe", verificationStatus:true, banStatus: false}]
>>>>>>> a1f1bed (changes)

  const [first_Name, setFirstName] = useState("");
  const [last_Name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
<<<<<<< HEAD
<<<<<<< HEAD
  const [banStatus, setBanStatus]  = useState(false)
=======

  const [emptyStatus, setEmptyStatus] = useState(false);
  const [matchPasswords, setMatchPasswords] = useState(true);

>>>>>>> 6a7d8e2 (adding ui for view other profile)
=======
  const [banStatus, setBanStatus]  = useState(false)
>>>>>>> a1f1bed (changes)


  useEffect(() => {
          setFirstName(testUser[0].first_name)
          setLastName(testUser[0].last_name)
          setUsername(testUser[0].username)
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
          setBanStatus(testUser[0].banStatus)
>>>>>>> a1f1bed (changes)
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
<<<<<<< HEAD
      <UserNavBar/>
>>>>>>> 6a7d8e2 (adding ui for view other profile)
=======
      <OtherProfileNavbar/>
>>>>>>> a1f1bed (changes)
      
      <Grid align = 'center'>
        <Paper style = {formStyle} elevation = {12}>
          <Grid align='center'>
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
            <Avatar ><BuildIcon/></Avatar>
            <h3>Username</h3>
=======
              <Typography variant="h5" component="div">
                        {username} {verificationStatus && <VerifiedIcon color = "primary"/>}
              </Typography>
>>>>>>> a1f1bed (changes)
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
<<<<<<< HEAD

>>>>>>> 6a7d8e2 (adding ui for view other profile)
=======
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
>>>>>>> a1f1bed (changes)
          </Grid>

        </div>
        </Paper>
      </Grid>
     
    </>
  );
}

export default ProfileView;