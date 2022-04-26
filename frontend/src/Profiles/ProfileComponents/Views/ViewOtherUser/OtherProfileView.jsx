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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ShieldIcon from '@mui/icons-material/Shield';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
          getUserInfoByID(userID).then(userInfo => {setUserInfo(userInfo)})
  },[count, userID]);

  function toggleUserBan(){
    toggleBan(userID)
    getUserInfoByID(userID).then(userInfo => {setUserInfo({...userInfo})})
    handleClose()
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


          {userInfo.userModerator === true && <Chip sx={{ m: 2, width: '25ch' }} icon={<ShieldIcon color = "warning" />} label="Moderator" />}
          {userInfo.userDoctor === true && <Chip sx={{ m: 2, width: '25ch' }} icon={<LocalHospitalIcon color = "warning" />} label="Doctor" />}
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
            {(!userInfo.userBanned && sessionStorage.getItem("userModerator") !== "0") && 
            <div>
            <Fab color="error"
                aria-label="Ban"
                onClick={handleClickOpen}>
              <GavelRoundedIcon/>
            </Fab>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to ban this user?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={e=>toggleUserBan(e)} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
            </div>
            }
            {(userInfo.userBanned && sessionStorage.getItem("userModerator") === "0") &&
              <item>
                <Button variant="contained"  color = "error" onClick={e=>toggleUserBan(e)} disabled = {true}>
                  Banned
                </Button>
              </item>}
            {(userInfo.userBanned && sessionStorage.getItem("userModerator") !== "0") &&
            <item>
              <Button variant="contained"  color = "error" onClick={e=>toggleUserBan(e)}>
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