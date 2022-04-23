import React, {Fragment} from 'react';
import {PostList} from "./PostList/PostList";
import CreatePostButton from "./CreatePostButton/CreatePostButton";
import Grid from "@mui/material/Grid/Grid";
import PostFilters from "./PostFilters/PostFilters";
import {createPost, deletePost, getPosts, searchPosts, editPost, postEngadgement} from "../kokaAPI"

export default class PostBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [
                // {postTitle:"Hello",
                //     postID: 1,
                //     userID: 1,
                //     votes: 0, // Net votes on the post (upvotes - downvotes)
                //     userVote: 0, // What the user (if the user is logged in, else 0) has voted on this post (-1, 0 or 1)
                //     verified: true, // Whether the post has been verified by the moderator
                //     date: "2019-01-03 12:34",
                //     restricted: false, // Whether or not the post is restricted to verfied users
                //     username: "John Doe",
                //     postEntry: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a mi quis diam scelerisque imperdiet. Nulla fermentum quis mi ut dapibus. Proin hendrerit sagittis magna, at ornare enim rhoncus vel. In vulputate enim nunc, vel laoreet quam dignissim malesuada. Sed sit amet odio eros. Vestibulum eleifend, nulla eget vehicula rutrum, nisi nibh lobortis justo, ac ultricies justo nulla id velit. Pellentesque massa leo, blandit rutrum sem et, congue mollis nibh. Praesent vitae auctor justo. Phasellus et nisi leo. Cras nec malesuada nisi. Sed vitae bibendum ligula, a gravida justo. Mauris scelerisque massa vel porttitor convallis. Aenean consequat pretium turpis sit amet ornare."
                // },
                // {postTitle:"Hello Version 2",
                //     postID: 2,
                //     userID: 2,
                //     votes: -3,
                //     restricted: true,
                //     verified: false,
                //     userVote: -1,
                //     date: "2019-01-03 12:54",
                //     username: "Dohn Joe",
                //     postEntry: "Curabitur non commodo dui, nec ullamcorper erat. Curabitur varius nulla lobortis ipsum lobortis, nec imperdiet dui dignissim. Pellentesque sed iaculis risus. Aenean suscipit in metus sit amet tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi maximus facilisis lorem eu venenatis. Nulla molestie risus ac vulputate condimentum. Curabitur at libero orci. In id neque velit. Nulla placerat eget ex non luctus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam diam risus, feugiat et feugiat ac, iaculis venenatis quam. Maecenas pellentesque nulla nec lacus varius, ac tempor nisl scelerisque."}
            ],
            mostVotesFilter: false,
            verifiedFilter: false
        }
    }

    setMostVotesFilter = (values) => {
        getPosts(values).then(posts => {
            if(this.state.verifiedFilter) {
                let new_posts = posts.filter(post => post.verified === true);
                console.log(new_posts);
                this.setState({posts: new_posts, mostVotesFilter: values});
            } else {
                this.setState({posts: posts, mostVotesFilter: values});
            }
        })

    }

    setVerifiedFilter = (values) => {
        this.setState({verifiedFilter: values}, this.updatePosts);
    }

    updatePosts = () =>{
        getPosts(this.state.mostVotesFilter).then(posts => {
            if(this.state.verifiedFilter) {
                let new_posts = posts.filter(post => post.verified === true);
                console.log(new_posts);
                this.setState({posts: new_posts});
            } else {
                this.setState({posts: posts});
            }
        })
    }

    componentDidMount() {
        getPosts(this.state.mostVotesFilter).then(posts => {
            if(this.state.verifiedFilter) {
                let new_posts = posts.filter(post => post.verified === true);
                console.log(new_posts);
                this.setState({posts: new_posts});
            } else {
                this.setState({posts: posts});
            }
        })
    }


    addPost = (post) => {

        createPost(post.title, post.content, post.restricted).then(post => {
            this.updatePosts();
        })

    }

    deletePost = (id) => {
        deletePost(id).then(post => {
            this.updatePosts();
        })
    }

    searchPosts = (searchTerm) => {
        searchPosts(searchTerm).then(posts => {
            this.setState({posts: posts})
        })
    }

    downvotePost = (id) => {
        let newPosts = this.state.posts.map(post => {
            if (post.postID === id) {
                if(post.userVote === -1) {
                    postEngadgement(id, 0).then(post => {
                        this.updatePosts();
                    })
                } else if(post.userVote === 0) {
                    postEngadgement(id, -1).then(post => {
                        this.updatePosts();
                    })
                }
                else{
                    postEngadgement(id, -1).then(post => {
                        this.updatePosts();
                    })
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
            if (post.postID === id) {
                if(post.userVote === -1) {
                    postEngadgement(id, 1).then(post => {
                        this.updatePosts();
                    })
                } else if(post.userVote === 0) {
                    postEngadgement(id, 1).then(post => {
                        this.updatePosts();
                    })
                }
                else{
                    postEngadgement(id, 0).then(post => {
                        this.updatePosts();
                    })
                }
            }
            return post;
        });
        this.setState({
            posts: newPosts
        });
    }

    updatePost = (id, title, content, restricted) => {
        console.log(id, title, content, restricted);
        editPost(id, title, content, restricted).then(post => {
            this.updatePosts();
        })
    }




    render() {
        return(
            <Fragment>
                <PostFilters searchPosts={this.searchPosts} filterPosts={this.setMostVotesFilter} filterVerified={this.setVerifiedFilter}/>
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