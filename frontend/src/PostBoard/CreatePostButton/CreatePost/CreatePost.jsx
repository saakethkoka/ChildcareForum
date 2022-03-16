import React, {Component, Fragment, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreatePost.css"
// import posts from "../../PostList/PostList.jsx";
import Button from '@mui/material/Button';
import {InputLabel, Grid, TextField, FormControl, Select, MenuItem, FormControlLabel, Checkbox, Dialog} from "@mui/material/";

export default function CreatePost(props){


    const handleClose = () => {
        props.onClose();
    };



    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [restricted, setRestricted] = useState(false);


    const clearForm = () => {
        setTitle("");
        setContent("");
        setRestricted(false);
    };

    // Sending this to the backend here
    const onPostSubmit = (event) =>{
        props.addPost({
            title: title,
            content: content,
            restricted: restricted,
            time: Date(),
            votes: 0,
            userVote: 0
        });
        clearForm();
        handleClose();
    };

    const onCancel = (event) =>{
        console.log("Cancel");
        clearForm();
        handleClose();
    };

    return (
        <Dialog onClose={onCancel} open={props.open}>
            <form noValidate
                  autoComplete="off">
                <Grid container spacing={1}>
                    <Grid xs={12} item>
                        <TextField id="title"
                                   label="Title"
                                   variant="outlined"
                                   onChange={title => setTitle(title.target.value)}
                                   value={title}
                                   fullWidth
                                   className="mb-16"/>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField id="content"
                                   label="Content"
                                   variant="outlined"
                                   multiline
                                   onChange={content => setContent(content.target.value)}
                                   fullWidth
                                   minRows={4}
                                   value={content}
                                   className="mb-16"/>
                    </Grid>
                    <Grid xs={12} item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={true}
                                    onChange={restricted => setRestricted(restricted.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Restrict Post (Only verified users can comment)"
                            className="mb-16"/>
                    </Grid>
                    <Grid xs={6} item>
                        <Button variant="contained"
                                color="secondary"
                                type="button"
                                fullWidth
                                onClick={onCancel}>
                            Cancel
                        </Button>

                    </Grid>
                    <Grid xs={6} item>
                        <Button variant="contained"
                                color="primary"
                                type="button"
                                onClick={onPostSubmit}
                                fullWidth>
                            Post
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Dialog>
    )


}