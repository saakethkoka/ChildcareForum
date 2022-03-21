import React from 'react';
import Post from "./Post/post";




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
            />
        );
        return(
            <div>
                {listItems}
            </div>

        )
    }

}