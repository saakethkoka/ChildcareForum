import React, { Fragment, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Fab from "@mui/material/Fab";
import Chip from "@mui/material/Chip";
import CommentIcon from '@mui/icons-material/Comment';
import {Dialog, DialogActions, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import CommentList from "./CommentList/CommentList";
import EditPost from "./EditPost/EditPost";
import Grid from "@mui/material/Grid/Grid";


export default function Post(props) {

    let post = props.post;
<<<<<<< HEAD
    let postType = props.postType
=======
>>>>>>> ab0c2b8 (Resolved)

    let [VotesColor, setVotesColor] = React.useState("warning");
    let [upvoteColor, setUpvoteColor] = React.useState("inherit");
    let [downvoteColor, setDownvoteColor] = React.useState("inherit");
    let [dialogOpen, setDialogOpen] = React.useState(false);
    let [editDialogOpen, setEditDialogOpen] = React.useState(false);
    let [commentDialogOpen, setCommentDialogOpen] = React.useState(false);

<<<<<<< HEAD
    let [postEffect, setPostEffect] = React.useState("0px 0px 5px 0px rgba(0,0,0,0.3)");

    useEffect(() => {
        handleButtonColor();
        handlePostEffect();
=======
    useEffect(() => {
        handleButtonColor();
>>>>>>> ab0c2b8 (Resolved)
        if(post.userVote === 0){
            setUpvoteColor("inherit");
            setDownvoteColor("inherit");
        }
        else if(post.userVote === 1){
            setUpvoteColor("primary");
            setDownvoteColor("inherit");
        }
        else if(post.userVote === -1){
            setUpvoteColor("inherit");
            setDownvoteColor("primary");
        }
    });

<<<<<<< HEAD
    const handlePostEffect = () => {
        if(post.verified){
            setPostEffect("0px 0px 10px 0px rgba(255,0,0,3)");
        }
        else{
            setPostEffect("0px 0px 5px 0px rgba(0,0,0,0.3)");
        }
    }

=======
>>>>>>> ab0c2b8 (Resolved)

    const handleButtonColor = () => {
        if(post.votes === 0){
            setVotesColor("warning");
        }
        else if(post.votes > 0){
            setVotesColor("primary");
        }
        else{
            setVotesColor("error");
        }
    }

    const handleDownvoteClick = () => {
<<<<<<< HEAD
        props.downvotePost(post.postID);
    }

    const handleUpvoteClick = () => {
        props.upvotePost(post.postID);
=======
        props.downvotePost(post.id);
    }

    const handleUpvoteClick = () => {
        props.upvotePost(post.id);
>>>>>>> ab0c2b8 (Resolved)
    }

    const handleDialogCancel = () =>{
        setDialogOpen(false);
    }

    const handleDialogConfirm = () =>{
        setDialogOpen(false);
<<<<<<< HEAD
        props.deletePost(post.postID);
=======
        props.deletePost(post.id);
>>>>>>> ab0c2b8 (Resolved)
    }

    const handleDialogOpen = () =>{
        setDialogOpen(true);
    }

    const handleCommentOpen = () =>{
        setCommentDialogOpen(true);
    }

    const handleCommentClose = () =>{
        setCommentDialogOpen(false);
    }

    const handleEditDialogOpen = () =>{
        setEditDialogOpen(true);
    }

    const handleEditDialogClose = () =>{
        setEditDialogOpen(false);
    }
    let fab_styles = {
        margin: "0 .5rem",
        display: "inline-block"
    }

    return(
<<<<<<< HEAD
        <Grid md={6} sm={12} containers>
=======
        <Grid  containers>
>>>>>>> ab0c2b8 (Resolved)
            <Card sx={{
                margin: "1rem",
                padding: 2,
                backgroundColor: '#fff',
<<<<<<< HEAD
                boxShadow: postEffect,
=======
                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.3)',
>>>>>>> ab0c2b8 (Resolved)
            }}>
                <CardContent sx={{
                    minHeight: 150,
                    maxHeight: 300,
                    overflow: 'auto',
                }}>
                    <Typography variant="h5" component="div">
<<<<<<< HEAD
                        {post.postTitle}
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {post.username} - {post.date.substr(0,10)}
                        </Typography>
                    </Typography>
                    <Typography variant="body1">
                        {post.postEntry}
=======
                        {post.title}
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {post.username} - {post.time}
                        </Typography>
                    </Typography>
                    <Typography variant="body1">
                        {post.content}
>>>>>>> ab0c2b8 (Resolved)
                    </Typography>
                </CardContent>
                <CardActions>
                    <Chip label={post.votes} color={VotesColor} />
                    <Fab color={upvoteColor}
                         sx={fab_styles}
                         onClick={handleUpvoteClick}
                         aria-label="Upvote">
                        <ThumbUpIcon/>
                    </Fab>
<<<<<<< HEAD

                    
=======
>>>>>>> ab0c2b8 (Resolved)
                    <Fab color={downvoteColor}
                         sx={fab_styles}
                         onClick={handleDownvoteClick}
                         aria-label="Downvote">
                        <ThumbDownIcon/>
                    </Fab>
                    <Fab color="primary"
                         sx={fab_styles}
                         onClick={handleCommentOpen}
                         aria-label="Comment">
                        <CommentIcon/>
                    </Fab>
                    <Fab color="secondary"
                         sx={fab_styles}
                         onClick={handleEditDialogOpen}
                         aria-label="Edit">
                        <EditIcon/>
                    </Fab>
                    <Fab color="secondary"
                         sx={fab_styles}
                         onClick={handleDialogOpen}
                         aria-label="Delete">
                        <DeleteForeverIcon/>
                    </Fab>
                </CardActions>
            </Card>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this post?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDialogCancel}>Cancel</Button>
                    <Button onClick={handleDialogConfirm} autoFocus>
                        Delete it
                    </Button>
                </DialogActions>
            </Dialog>
<<<<<<< HEAD
            <CommentList postId={post.postID} open={commentDialogOpen} onClose={handleCommentClose}/>
=======
            <CommentList postId={post.id} open={commentDialogOpen} onClose={handleCommentClose}/>
>>>>>>> ab0c2b8 (Resolved)
            <EditPost updatePost={props.updatePost} post={post} open={editDialogOpen} onClose={handleEditDialogClose}/>
        </Grid>
    )
}