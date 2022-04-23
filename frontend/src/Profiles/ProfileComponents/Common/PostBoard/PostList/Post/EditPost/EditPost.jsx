import {Checkbox, Dialog, FormControlLabel, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import Grid from "@mui/material/Grid/Grid";


export default function EditPost(props){


    let [title, setTitle] = React.useState(props.post.postTitle);
    let [content, setContent] = React.useState(props.post.postEntry);
    let [restricted, setRestricted] = React.useState(props.post.restricted);

    const onCancel = () => {
        props.onClose();
    }

    const onSave = () => {
        props.updatePost(props.post.postID, title, content, restricted);
        props.onClose();
    }

    return(
        <Dialog open={props.open} onClose={props.onClose}>
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
                                    checked={restricted}
                                    onChange={(e) => setRestricted(e.target.checked)}
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
                                onClick={onSave}
                                fullWidth>
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Dialog>
    )

}