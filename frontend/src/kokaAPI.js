import axios from 'axios';

const base_url = 'http://localhost:8000';

export const getPosts = () => new Promise((resolve, reject) => {
    const id = sessionStorage.getItem('userID')
    if(id) {
        axios.get(`${base_url}/discussionBoard?curruserID=${id}`)
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    } else {
        axios.get(`${base_url}/discussionBoard`)
            .then(res => resolve(res.data))
            .catch(err => reject(err));
    }
});


export const searchPosts = (searchWord) => new Promise((resolve, reject) => {

    const api_params = {
        params: {
            searchWord: searchWord
        }
    }

    axios.get(`${base_url}/searchposts`, api_params)
        .then(res => resolve(res.data))
        .catch(err =>{
            alert(err)
            reject(err)
        });
});

export const getComments = (id) => new Promise((resolve, reject) => {
    if (sessionStorage.getItem('userID')){
        axios.get(`${base_url}/comment?postID=${id}&curruserID=${sessionStorage.getItem('userID')}`)
            .then(res => resolve(res.data))
            .catch(err =>{
                alert(err)
                reject(err)
            });
    }
    else{
        axios.get(`${base_url}/comment?postID=${id}`)
            .then(res => resolve(res.data))
            .catch(err =>{
                alert(err)
                reject(err)
            });
    }

});


export const postComment = (userID, postID, content) => new Promise((resolve, reject) => {
    let params = {
        userID: userID,
        postID: postID,
        content: content
    };
    axios.post(`${base_url}/comment`, params)
        .then(res => resolve(res.data))
        .catch(err =>{
            alert(err)
            reject(err)
        });
});


export const commentEngadgement = (commentID, value) => new Promise((resolve, reject) => {
    let params = {
        commentID: commentID,
        value: value
    };
    if (sessionStorage.getItem("userID")){
        axios.post(`${base_url}/commentVote?value=${value}&curruserID=${sessionStorage.getItem("userID")}&commentID=${commentID}`, params)
            .then(res => resolve(res.data))
            .catch(err =>{
                alert(err)
                reject(err)
            });
    }
});

export const createPost = (postTitle, postEntry, restricted) => new Promise((resolve, reject) => {
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();

    date = yyyy + '-' + mm + '-' + dd;
    let params = {
        postTitle: postTitle,
        postEntry: postEntry,
        restricted: restricted ? 1 : 0,
        date: date
    };
    console.log(params)
    if (sessionStorage.getItem("userID")){
        axios.post(`${base_url}/discussionBoard?curruserID=${sessionStorage.getItem("userID")}`, params)
            .then(res => resolve(res.data))
            .catch(err =>{
                alert(err);
                reject(err);
            });
    }
    else{
        resolve(1);
    }
});


export const deletePost = (postID) => new Promise((resolve, reject) => {
    axios.delete(`${base_url}/discussionBoard/${postID}`)
        .then(res => resolve(res.data))
        .catch(err =>{
            alert(err);
            reject(err);
        });
});