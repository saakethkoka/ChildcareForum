import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, {useEffect} from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid/Grid";
import Chip from "@mui/material/Chip";

export default function Comment(params){
    let comment = params.comment;

    let [upvoteColor, setUpvoteColor] = React.useState("inherit");
    let [downvoteColor, setDownvoteColor] = React.useState("inherit");
    let [votesColor, setVotesColor] = React.useState("warning");

    useEffect(() =>{
        if(comment.userVote === 0){
            setUpvoteColor("inherit");
            setDownvoteColor("inherit");
        }
        else if(comment.userVote === 1){
            setUpvoteColor("primary");
            setDownvoteColor("inherit");
        }
        else if(comment.userVote === -1){
            setUpvoteColor("inherit");
            setDownvoteColor("primary");
        }

        if(comment.votes > 0){
            setVotesColor("primary");
        }
        else if(comment.votes < 0){
            setVotesColor("error");
        }
        else{
            setVotesColor("warning");
        }
    });


    let fab_styles = {
        margin: ".25rem .25rem",
        display: "block"
    }


    return(
        <Card sx={{height: "auto", margin: "1rem"}} variant="outlined">
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <Fab color={upvoteColor}
                             size={'small'}
                             onClick={() => params.onUpvote(comment.id)}
                             sx={fab_styles}
                             aria-label="Upvote">
                        <ThumbUpIcon/>
                        </Fab>
                        <Chip label={comment.votes}
                              color={votesColor}
                              sx={{margin: ".5rem .5rem"}}/>
                        <Fab color={downvoteColor}
                             size={'small'}
                             sx={fab_styles}
                             onClick={() => params.onDownvote(comment.id)}
                             aria-label="Downvote">
                            <ThumbDownIcon/>
                        </Fab>
                    </Grid>
                    <Grid item xs={10} sx={{margin:"auto"}}>
                        <Typography color="text.secondary" gutterBottom>
                            {comment.author}
                        </Typography>
                        <Typography variant="body1">
                            {comment.content}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}