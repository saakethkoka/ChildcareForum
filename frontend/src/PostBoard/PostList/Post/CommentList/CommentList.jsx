import React, { Fragment, useEffect} from 'react';
import {Dialog, TextField} from "@mui/material";
import Comment from './Comment/Comment';
import Grid from "@mui/material/Grid/Grid";
import Button from "@mui/material/Button";

const sample_comments = [
    {title: "Comment 1", author:"john", content: "This is the first comment", userVote: 0, totalVotes: 0, id: 1},
    {title: "Comment 2", author:"bob", content: "This is the second comment", userVote: 0, totalVotes: 0, id: 2},
    {title: "Comment 3", author:"bob", content: "This is the third comment", userVote: 0, totalVotes: 0, id: 3},
    {title: "Comment 4", author:"bob", content: "This is the fourth comment", userVote: 0, totalVotes: 0, id: 4},
    {title: "Comment 5", author:"bob", content: "This is the fifth comment", userVote: 0, totalVotes: 0, id: 5},
    {title: "Comment 6", author:"bob", content: "This is the sixth comment", userVote: 0, totalVotes: 0, id: 6},
    {title: "Comment 7", author:"bob", content: "This is the seventh comment", userVote: 0, totalVotes: 0, id: 7},
    {title: "Comment 8", author:"bob", content: "This is the eighth comment", userVote: 0, totalVotes: 0, id: 8},
    {title: "Comment 9", author:"bob", content: "This is the ninth comment", userVote: 0, totalVotes: 0, id: 9},
    {title: "Comment 10", author:"bob", content: "This is the tenth comment", userVote: 0, totalVotes: 0, id: 10},
]

export default function CommentList(props){

    let [comment, setComment] = React.useState("");


    const onCancel = () => {
        // TODO: clear form maybe
        props.onClose();
    }

    const onCommentSubmit = () => {
        console.log(comment);
        setComment("");
    }

    const addComment = (comment) => {
        props.addComment({
            author: "bob",
            content: comment,
            userVote: 0,
            totalVotes: 0,
        });
    }

    return(
        <Dialog open={props.open}
                onClose={onCancel}
                aria-labelledby="alert-dialog-title"
                fullWidth
                aria-describedby="alert-dialog-description">

            <h1>Comments</h1>
            {sample_comments.map(comment =>
                <Comment key={comment.id} comment={comment}/>
            )}
            <form noValidate autoComplete="off">
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