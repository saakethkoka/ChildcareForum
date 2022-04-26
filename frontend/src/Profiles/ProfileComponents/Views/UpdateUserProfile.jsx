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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getUserInfoByID, getStatusByID, requestByID, cancelRequestByID, updateUser } from '../../../kokaAPI'
import ResponsiveAppBar from "../ResponsiveAppBar";







function UserProfile() {
  const textStyle = {margin: "10px auto"}
  const formStyle = {padding: 20, height: '105vh', width: '50vh', margin: "90px auto"}

  const testUser = [{id: 1, first_name: "John", last_name: "Doe", email: "test@gmail.com", password: "test123", username: "johndoe"}]
  const [userInfo, setUserInfo] = useState({})

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
  const [emptyConfirmPassword, setEmptyConfirmPassword] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(false);
  const [requestStatus, setRequestStatus] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openVerification, setOpenVerification] = useState(false);
  const [text, setText] = useState('');
  const [emptyStatus, setEmptyStatus] = useState(false);
  const [matchPasswords, setMatchPasswords] = useState(true);
  const [count, setCount] = useState(0)
  const handleChange = (e) => {
    setText(e.target.value);
  }
  const handleClickOpenProfile = () => {
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const handleClickOpenVerification = () => {
    setOpenVerification(true);
  };

  const handleCloseVerification = () => {
    setOpenVerification(false);
  };

  const refreshRequest = () =>{
      setCount(count+1)
  }



  useEffect(() => {
          getUserInfoByID(sessionStorage.getItem("userID")).then(userInfo => {
            setUserInfo(userInfo)
            const firstName = userInfo.first_name
            setFirstName(firstName)
            const lastName = userInfo.last_name
            setLastName(lastName)
            const userName = userInfo.username
            setUsername(userName)
            const passwordConst = userInfo.password
            setPassword(passwordConst)
            setConfirmPassword(passwordConst)
            const verif = userInfo.userVerified
            setVerificationStatus(verif)
            const emailConst = userInfo.email
            setEmail(emailConst)
          })
          
          getStatusByID(sessionStorage.getItem("userID")).then(userInfo => {
            const requestStatusConst = userInfo.status
            setRequestStatus(requestStatusConst)
          })
          
  }, [count]);

  function updateProfile(){
    console.log(first_Name)
    if (!first_Name || !last_Name || !email || !username || !password || !confirmPassword) {
      setEmptyStatus(true)
      return;
    }
    else if(confirmPassword !== password){
      setMatchPasswords(false)
      console.log("mismatched passwords")
      return;
    }
    console.log("passed")
    let account = {
      username: username,
      first_name: first_Name,
      last_name: last_Name,
      email,
      password
    };
    updateUser(account).then(handleClickOpenProfile())
  }

  function request(e){
    e.preventDefault();
        requestByID(text).then(() => {
            setText('');
            handleCloseVerification()
    });
    refreshRequest()
  }

  function unRequest(){
    cancelRequestByID(sessionStorage.getItem("userID"))
    refreshRequest()
  }


  return (
    <>
      <ResponsiveAppBar/>
      
      <Grid align = 'center'>
        <Paper style = {formStyle} elevation = {12}>
          <Grid align='center'>
            <Avatar ><BuildIcon/></Avatar>
            <h3>Update Profile</h3>
          </Grid>
        <div>

          {emptyStatus && <Alert variant="filled" severity="error"  action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setEmptyStatus(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>
            All required fields must be filled!
          </Alert>}

          {!matchPasswords && <Alert variant="filled" severity="error"  action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setMatchPasswords(true);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>
            Passwords must match!
          </Alert>}


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


          <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" required = {true} error = {emptyLast_Name}>
            <InputLabel htmlFor="outlined-adornment-password">Last Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              value={last_Name}
              onChange={e => setLastName(e.target.value)}
              label="Last Name"
              onBlur={ () => {
                if(last_Name.length===0){
                  setEmptyLastName(true)
                }
                else{
                  setEmptyLastName(false)
                }
              }}
            />
          </FormControl>

          <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" required = {true} error = {emptyEmail}>
            <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              label="Email"
              onBlur={ () => {
                if(email.length===0){
                  setEmptyEmail(true)
                }
                else{
                  setEmptyEmail(false)
                }
              }}
            />
          </FormControl>

          <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" required = {true} error = {emptyPassword}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              label="Password"
              onBlur={ () => {
                if(password.length===0){
                  setEmptyPassword(true)
                }
                else{
                  setEmptyPassword(false)
                }
              }}
            />
          </FormControl>


          <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" required = {true} error = {emptyConfirmPassword}>
            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              label="Password"
              onBlur={ () => {
                if(confirmPassword.length===0){
                  setEmptyConfirmPassword(true)
                }
                else{
                  setEmptyConfirmPassword(false)
                }
              }}
            />
          </FormControl>
          <Grid align='center'>
            <Stack>
              {(requestStatus === false && verificationStatus === false) && <item>
              <Button variant="contained"  endIcon={<SendIcon />} color = "success" onClick={handleClickOpenVerification}>
                Request Verification
              </Button>
              <Dialog open={openVerification} onClose={handleCloseVerification}>
                <DialogTitle>Request Form</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Verification Request
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={e=>request(e)}>Send</Button>
                </DialogActions>
              </Dialog>
              </item>
              }
              {requestStatus === true && <item>
              <Button variant="contained"  endIcon={<SendIcon />} color = "success" onClick={e=>unRequest(e)} disabled>
                Verification Requested
              </Button>
              </item>}

              {verificationStatus === true && <item>
                <Chip label="verified" color="success" icon={<VerifiedIcon />} />
              </item>}

              <item>
              <Button variant="contained" color="primary" sx={{ m: 2, width: '15ch' }} onClick={ e => updateProfile(e)}>
                Update
              </Button>
              <Dialog
                open={openProfile}
                onClose={handleCloseProfile}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Profile has been updated"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleCloseProfile} autoFocus>
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
              </item>
            </Stack>
          </Grid>

        </div>
        </Paper>
      </Grid>
     
    </>
  );
}

export default UserProfile;