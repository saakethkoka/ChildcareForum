import React, { Fragment, useEffect} from 'react';
import {Dialog, TextField} from "@mui/material";
import Comment from './Comment/Comment';
import Grid from "@mui/material/Grid/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {getComments, postComment, commentEngadgement} from "../../../../kokaAPI";

// const sample_comments = [
//     {
//         author:"john", // username of commenter
//         content: "This is the first comment", // content of comment
//         userVote: 1, // What the user (if the user is logged in, else 0) has voted on this post (-1, 0 or 1)
//         votes: 0, // Net votes on this post (upvotes - downvotes)
//         id: 1 // Unique id of comment
//     },
//     {author:"bob", content: "This is the second comment", userVote: 0, votes: 0, id: 2},
//     {author:"bob", content: "This is the third comment", userVote: -1, votes: 0, id: 3},
//     {author:"bob", content: "This is the fourth comment", userVote: 0, votes: 0, id: 4},
//     {author:"bob", content: "This is the fifth comment", userVote: 0, votes: 0, id: 5},
//     {author:"bob", content: "This is the sixth comment", userVote: 0, votes: 0, id: 6},
//     {author:"bob", content: "This isThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first commentThis is the first comment the seventh comment", userVote: 0, votes: 0, id: 7},
//     {author:"bob", content: "This is the eighth comment", userVote: 0, votes: 0, id: 8},
//     {author:"bob", content: "This is the ninth comment", userVote: 0, votes: 0, id: 9},
//     {author:"bob", content: "This is the tenth comment", userVote: 0, votes: 0, id: 10},
// ]

export default function CommentList(props){

    let [comment, setComment] = React.useState("");
    let [comments, setComments] = React.useState([]);
    let [commentingHidden, setCommentingHidden] = React.useState(false);

    useEffect(() => {
        if(sessionStorage.getItem("isBanned") === "1"){
            setCommentingHidden(true);
        }
        if(props.restricted === true && parseInt(sessionStorage.getItem("userID")) !== props.userID){
            setCommentingHidden(true);
        }
        if(sessionStorage.getItem("userModerator") === "1"){
            setCommentingHidden(false);
        }
        if(sessionStorage.getItem("userVerified") === "1"){
            setCommentingHidden(false);
        }
        if(sessionStorage.getItem("userAdmin") === "1"){
            setCommentingHidden(false);
        }
        if(!sessionStorage.getItem("userID")){
            setCommentingHidden(true);
        }
        getComments(props.postId).then(res => {
            setComments(res);
        })
    }, [props.open]);

    

    const onCancel = () => {
        props.onClose();
    }

    const onCommentSubmit = () => {
        postComment(4, props.postId, comment).then(res => {
            getComments(props.postId).then(res => {
                setComments(res);
            })
        });
        setComment("");
    }


    const onUpvote = (id) => {
        let new_comments = comments.map(comment => {
            if(comment.id === id){
                if(comment.userVote === -1) {
                    commentEngadgement(id, 1).then(res => {
                        getComments(props.postId).then(res => {
                            setComments(res);
                        })
                    });
                } else if(comment.userVote === 0) {
                    commentEngadgement(id, 1).then(res => {
                        getComments(props.postId).then(res => {
                            setComments(res);
                        })
                    });
                }
                else{
                    commentEngadgement(id, 0).then(res => {
                        getComments(props.postId).then(res => {
                            setComments(res);
                        })
                    });
                }
            }
            return comment;
        });
        setComments(new_comments);
    }

    const onDownvote = (id) => {
        let new_comments = comments.map(comment => {
            if(comment.id === id){
                if(comment.userVote === -1) {
                    commentEngadgement(id, 0).then(res => {
                        getComments(props.postId).then(res => {
                            setComments(res);
                        })
                    });
                } else if(comment.userVote === 0) {
                    commentEngadgement(id, -1).then(res => {
                        getComments(props.postId).then(res => {
                            setComments(res);
                        })
                    });
                }
                else{
                    commentEngadgement(id, -1).then(res => {
                        getComments(props.postId).then(res => {
                            setComments(res);
                        })
                    });
                }
            }
            return comment;
        });
        setComments(new_comments);
    }

    return(
        <Dialog open={props.open}
                onClose={onCancel}
                aria-labelledby="alert-dialog-title"
                fullWidth
                scroll='body'
                sx={{overflowY: "scroll"}}
                aria-describedby="alert-dialog-description">

            <Typography variant="h5"
                        sx={{margin: "1rem"}}
                        component="div">
                Comments
            </Typography>
            {comments.map(comment =>
                <Comment key={comment.id}
                         onUpvote={onUpvote}
                         onDownvote={onDownvote}
                         comment={comment}/>
            )}
            <form noValidate hidden={commentingHidden} autoComplete="off">
                <TextField id="comment"
                           label="Comment"
                           variant="outlined"
                           multiline
                           value={comment}
                           onChange={(e) => setComment(e.target.value)}
                           fullWidth
                           minRows={4}
                           className="mb-16"
                />
                <Button variant="contained"
                        color="primary"
                        type="button"
                        sx={{margin: "1rem 0 0 0"}}
                        onClick={onCommentSubmit}
                        fullWidth>
                    Post
                </Button>
            </form>


        </Dialog>
    )
}