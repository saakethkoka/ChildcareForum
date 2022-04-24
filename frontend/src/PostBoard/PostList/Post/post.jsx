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
import {CardHeader} from "@mui/material";
import {Dialog, DialogActions, DialogTitle, Link} from "@mui/material";
import Button from "@mui/material/Button";
import CommentList from "./CommentList/CommentList";
import EditPost from "./EditPost/EditPost";
import Grid from "@mui/material/Grid/Grid";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {savePost} from "../../../kokaAPI";
import VerifiedIcon from '@mui/icons-material/Verified';

const ITEM_HEIGHT = 48;
// https://mui.com/material-ui/react-menu/
function LongMenu(props) {
    let [options, setOptions] = React.useState(["Save Post"]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{float: "right"}}>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => savePost(props.postID).then(handleClose()).catch(handleClose())}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default function Post(props) {

    let post = props.post;

    let [VotesColor, setVotesColor] = React.useState("warning");
    let [upvoteColor, setUpvoteColor] = React.useState("inherit");
    let [downvoteColor, setDownvoteColor] = React.useState("inherit");
    let [dialogOpen, setDialogOpen] = React.useState(false);
    let [editDialogOpen, setEditDialogOpen] = React.useState(false);
    let [commentDialogOpen, setCommentDialogOpen] = React.useState(false);
    let [hideEdit, setHideEdit] = React.useState(true);
    let [hideDelete, setHideDelete] = React.useState(true);


    let [postEffect, setPostEffect] = React.useState("0px 0px 5px 0px rgba(0,0,0,0.3)");

    useEffect(() => {
        setHideEdit(true);
        setHideDelete(true);
        handleButtonColor();
        handlePostEffect();
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
        if (parseInt(sessionStorage.getItem("userID")) === (props.post.userID)) {
            console.log(post.username);
            setHideEdit(false);
            setHideDelete(false);
        }

        if(parseInt(sessionStorage.getItem("userModerator")) === 1){
            setHideDelete(false);
        }

    });

    const handlePostEffect = () => {
        if(post.verified){
            setPostEffect("0px 0px 10px 0px rgba(255,0,0,3)");
        }
        else{
            setPostEffect("0px 0px 5px 0px rgba(0,0,0,0.3)");
        }
    }


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
        props.downvotePost(post.postID);
    }

    const handleUpvoteClick = () => {
        props.upvotePost(post.postID);
    }

    const handleDialogCancel = () =>{
        setDialogOpen(false);
    }

    const handleDialogConfirm = () =>{
        setDialogOpen(false);
        props.deletePost(post.postID);
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
        <Grid md={6} sm={12} containers>
            <Card sx={{
                margin: "1rem",
                padding: 2,
                backgroundColor: '#fff',
                boxShadow: postEffect,

            }}>
                <CardContent sx={{
                    minHeight: 150,
                    maxHeight: 300,
                    overflow: 'auto',
                }}>
                    <LongMenu postID={post.postID}/>
                    <Typography variant="h5" component="div">
                        {post.postTitle}
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            <Link href={`/user/profile/${post.userID}`}>{post.username}</Link> {post.verified && <VerifiedIcon color="primary"/>} - {post.date.substr(0,10)}
                        </Typography>
                    </Typography>
                    <Typography variant="body1">
                        {post.postEntry}
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
                         hidden={hideEdit}
                         onClick={handleEditDialogOpen}
                         aria-label="Edit">
                        <EditIcon/>
                    </Fab>
                    <Fab color="secondary"
                         sx={fab_styles}
                         onClick={handleDialogOpen}
                         hidden={hideDelete}
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
            <CommentList postId={post.postID} restricted={post.restricted} userID={post.userID} open={commentDialogOpen} onClose={handleCommentClose}/>
            <EditPost updatePost={props.updatePost} post={post} open={editDialogOpen} onClose={handleEditDialogClose}/>
        </Grid>
    )
}