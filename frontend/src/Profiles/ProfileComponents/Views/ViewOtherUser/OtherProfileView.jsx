import React from "react";
import { useState, useEffect, useReducer } from "react";
import { TextField, Container, Paper, Card, Stack, Grid, InputAdornment, FormControl, OutlinedInput, FormHelperText, InputLabel, IconButton, Button, Chip, Alert, Typography, Fab } from "@mui/material";
import BuildIcon from '@mui/icons-material/Build';
import { Avatar } from "@mui/material";
import { spacing } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import OtherProfileNavbar from "./OtherUserNavBar";
import { getUserInfoByID, toggleBan } from "../../../../kokaAPI"
import { useParams } from "react-router-dom"
// react-bootstrap components






function ProfileView() {
  const textStyle = {margin: "10px auto"}
  const formStyle = {padding: 20, height: '50vh', width: '50vh', margin: "90px auto"}



  const [userInfo, setUserInfo] = useState({})
  const { userID } = useParams()
  const [count, setCount] = useState(0)
  const refreshBan = () =>{
    setCount(count + 1)
  }


  useEffect(() => {
          getUserInfoByID(userID).then(userInfo => {setUserInfo(userInfo)})
  },[count, userID]);

  function toggleUserBan(){
    toggleBan(userID)
    getUserInfoByID(userID).then(userInfo => {setUserInfo({...userInfo})})
    refreshBan()
  }

  return (
    <>
      <OtherProfileNavbar userID = {userID}/>
      
      <Grid align = 'center'>
        <Paper style = {formStyle} elevation = {12}>
          <Grid align='center'>
              <Typography variant="h5" component="div">
                        {userInfo.username} {userInfo.userVerified && <VerifiedIcon color = "primary"/>}
              </Typography>
          </Grid>
        <div>


          
          <TextField sx={{ m: 2, width: '25ch' }} variant="outlined"
            id="outlined-read-only-input"
            InputLabelProps={{ shrink: true }}
            label="First Name"
            value={userInfo.first_name}
            InputProps={{
              readOnly: true,
            }}
          >
          </TextField>


          <TextField sx={{ m: 2, width: '25ch' }} variant="outlined"
            id="outlined-read-only-input"
            InputLabelProps={{ shrink: true }}
            label="Last Name"
            value={userInfo.last_name}
            InputProps={{
              readOnly: true,
            }}
          >
          </TextField>
          
          
            
          <Grid align='center'>
            {(!userInfo.userBanned && sessionStorage.getItem("userModerator")) && <Fab color="error"
                aria-label="Ban"
                onClick={e=>toggleUserBan(e)}>
              <GavelRoundedIcon/>
            </Fab>}
            {(userInfo.userBanned && sessionStorage.getItem("userModerator")) && 
              <item>
                <Button variant="contained"  color = "error" onClick={e=>toggleUserBan(e)}>
                  Banned
                </Button>
              </item>}
            {(userInfo.userBanned && !sessionStorage.getItem("userModerator")) && 
            <item>
              <Button variant="contained"  color = "error" onClick={e=>toggleUserBan(e)} disabled = {true}>
                Unban
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