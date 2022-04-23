import React, {Fragment} from 'react';
import CreateIcon from "@mui/icons-material/Create";
import Fab from "@mui/material/Fab";
import CreatPost from './CreatePost/CreatePost';



export default function CreatePostButton(props){
    const addPost = props.addPost;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <Fragment>
            <Fab color="primary"
                 variant="extended"
                 onClick={handleClickOpen}
                 hidden={!sessionStorage.getItem("userID") || sessionStorage.getItem("userBanned") === "1"}
                 style={{position: 'fixed', bottom: '20px', right: '20px'}}
                 aria-label="new-post">
                <CreateIcon sx={{ mr: 1 }}/>
                Create Post
            </Fab>
            <CreatPost onClose={handleClose} open={open} addPost={addPost}/>
        </Fragment>

    )
}