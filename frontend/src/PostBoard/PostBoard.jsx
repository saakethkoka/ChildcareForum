import React, {Fragment} from 'react';
import {PostList} from "./PostList/PostList";
import CreatePostButton from "./CreatePostButton/CreatePostButton";
import Grid from "@mui/material/Grid/Grid";
import PostFilters from "./PostFilters/PostFilters";


export default class PostBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [
                {title:"Hello",
                    id: 1,
                    votes: 0,
                    userVote: 0,
                    time: "2019-01-03 12:34",
                    restricted: false,
                    username: "John Doe",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a mi quis diam scelerisque imperdiet. Nulla fermentum quis mi ut dapibus. Proin hendrerit sagittis magna, at ornare enim rhoncus vel. In vulputate enim nunc, vel laoreet quam dignissim malesuada. Sed sit amet odio eros. Vestibulum eleifend, nulla eget vehicula rutrum, nisi nibh lobortis justo, ac ultricies justo nulla id velit. Pellentesque massa leo, blandit rutrum sem et, congue mollis nibh. Praesent vitae auctor justo. Phasellus et nisi leo. Cras nec malesuada nisi. Sed vitae bibendum ligula, a gravida justo. Mauris scelerisque massa vel porttitor convallis. Aenean consequat pretium turpis sit amet ornare."},
                {title:"Hello Version 2",
                    id: 2,
                    votes: -3,
                    restricted: true,
                    userVote: -1,
                    time: "2019-01-03 12:54",
                    username: "Dohn Joe",
                    content: "Curabitur non commodo dui, nec ullamcorper erat. Curabitur varius nulla lobortis ipsum lobortis, nec imperdiet dui dignissim. Pellentesque sed iaculis risus. Aenean suscipit in metus sit amet tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi maximus facilisis lorem eu venenatis. Nulla molestie risus ac vulputate condimentum. Curabitur at libero orci. In id neque velit. Nulla placerat eget ex non luctus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam diam risus, feugiat et feugiat ac, iaculis venenatis quam. Maecenas pellentesque nulla nec lacus varius, ac tempor nisl scelerisque."}
            ]
        }
    }



    addPost = (post) => {
        this.setState({
            posts: [...this.state.posts, post]
        });
    }

    deletePost = (id) => {
        this.setState({
            posts: this.state.posts.filter(post => post.id !== id)
        });
    }

    downvotePost = (id) => {
        let newPosts = this.state.posts.map(post => {
            if (post.id === id) {
                if(post.userVote === 1) {
                    post.userVote = -1;
                    post.votes -= 2;
                } else if(post.userVote === 0) {
                    post.userVote = -1;
                    post.votes -= 1;
                }
                else{
                    post.userVote = 0;
                    post.votes += 1;
                }
            }
            return post;
        });
        this.setState({
            posts: newPosts
        });
    }

    upvotePost = (id) => {
        let newPosts = this.state.posts.map(post => {
            if (post.id === id) {
                if(post.userVote === -1) {
                    post.userVote = 1;
                    post.votes += 2;
                } else if(post.userVote === 0) {
                    post.userVote = 1;
                    post.votes += 1;
                }
                else{
                    post.userVote = 0;
                    post.votes -= 1;
                }
            }
            return post;
        });
        this.setState({
            posts: newPosts
        });
    }

    updatePost = (id, title, content, restricted) => {
        let newPosts = this.state.posts.map(post => {
            if (post.id === id) {
                post.title = title;
                post.content = content;
                post.restricted = restricted;
            }
            return post;
        });
        this.setState({
            posts: newPosts
        });

    }




    render() {
        return(
            <Fragment>
                <PostFilters/>
                <PostList posts={this.state.posts}
                          deletePost={this.deletePost}
                          downvotePost={this.downvotePost}
                          updatePost={this.updatePost}
                          upvotePost={this.upvotePost}
                />
                <Grid xs={3}>
                    <CreatePostButton addPost={this.addPost}/>
                </Grid>


            </Fragment>
        )
    }
}