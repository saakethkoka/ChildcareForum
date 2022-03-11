import React, { Component } from 'react';
import {Post} from "./Post/post";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';




export class PostList extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        const listItems = this.props.posts.map((post) =>
            <Post title={post.title} content={post.content}/>
        );
        return(
            <div>
                {listItems}
            </div>

        )
    }

}