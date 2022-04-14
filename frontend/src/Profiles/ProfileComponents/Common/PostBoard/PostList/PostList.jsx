import React from 'react';
import Post from "./Post/post";
import Grid from "@mui/material/Grid/Grid";




export class PostList extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const listItems = this.props.posts.map((post) =>
            <Post post={post}
                  deletePost={this.props.deletePost}
                  downvotePost={this.props.downvotePost}
                  updatePost={this.props.updatePost}
                  upvotePost={this.props.upvotePost}
<<<<<<< HEAD
                  postType = {this.props.postType}
=======
>>>>>>> 7a4857e (Added styling to user update)
            />
        );
        return(
            <Grid container
                  sx={{
                      padding: '1rem',
                      backgroundColor: '#F3F6F9',
                      height: '100%',
                  }}
                  spacing={1}>
                {listItems}
            </Grid>

        )
    }

}