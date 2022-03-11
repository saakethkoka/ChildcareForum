import React, {Component, Fragment} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreatePost.css"
import { posts } from "../PostList/PostList.jsx";
import Button from '@mui/material/Button';
import {InputLabel, Grid, TextField, FormControl, Select, MenuItem, FormControlLabel, Checkbox} from "@mui/material/";

export class CreatePost extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        title: '',
        content: '',
        restricted: false
    };
  }

    clearForm = () => {
        this.setState({
            title: '',
            content: '',
            restricted: false
        });
    }
    handleChangeTitle = (e) =>{
        this.setState({
            title: e.target.value
        })
    }
    handleRestricted = (e) =>{
        this.setState({
            restricted: e.target.checked
        })
    }
    handleChangeContent = (e) =>{
        this.setState({
            content: e.target.value
        })
    }

    // Sending this to the backend here
    onPostSubmit = (event) =>{
        console.log(this.state);
        this.props.addPost(this.state);
        this.clearForm();
    }

    onCancel = (event) =>{
        console.log("Cancel");
    }

  render() {
    return (
        <form noValidate
              autoComplete="off">
            <Grid container spacing={1}>
                <Grid xs={12} item>
                    <TextField id="title"
                               label="Title"
                               variant="outlined"
                               onChange={this.handleChangeTitle}
                               value={this.state.title}
                               fullWidth
                               className="mb-16"/>
                </Grid>
                <Grid xs={12} item>
                    <TextField id="content"
                               label="Content"
                               variant="outlined"
                               multiline
                               onChange={this.handleChangeContent}
                               fullWidth
                               minRows={4}
                               value={this.state.content}
                               className="mb-16"/>
                </Grid>
                <Grid xs={12} item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={true}
                                onChange={this.handleRestricted}
                                color="primary"
                            />
                        }
                        label="Restrict Post"
                        className="mb-16"/>
                </Grid>
                <Grid xs={6} item>
                    <Button variant="contained"
                            color="primary"
                            type="button"
                            onClick={this.onPostSubmit}
                            fullWidth>
                        Post
                    </Button>
                </Grid>
                <Grid xs={6} item>
                    <Button variant="contained"
                            color="secondary"
                            type="button"
                            fullWidth
                            onClick={this.onCancel}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
  }


}
