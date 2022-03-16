import React, { Component } from 'react';
import Post from "./Post/post";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';




export class PostList extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const listItems = this.props.posts.map((post) =>
            <Post post={post}
                  deletePost={this.props.deletePost}
                  downvotePost={this.props.downvotePost}
                  upvotePost={this.props.upvotePost}
            />
        );
        return(
            <div>
                {listItems}
            </div>

        )
    }

}