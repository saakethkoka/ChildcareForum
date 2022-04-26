import axios from 'axios';

const base_url = 'http://localhost:5000';

export const getPosts = (mostVotes) => new Promise((resolve, reject) => {
    if (mostVotes) {
        const id = sessionStorage.getItem('userID');
        if (id) {
            axios.get(`${base_url}/voteorder?curruserID=${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        } else {
            axios.get(`${base_url}/voteorder`)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        }
    } else {
        const id = sessionStorage.getItem('userID');
        if (id) {
            axios.get(`${base_url}/dateorder?curruserID=${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        } else {
            axios.get(`${base_url}/dateorder`)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        }
    }
});
// export const getPosts = () => new Promise((resolve, reject) => {
//     const id = sessionStorage.getItem('userID')
//     console.log(id)
//     if(id) {
//         axios.get(`${base_url}/discussionBoard?curruserID=${id}`)
//             .then(res => resolve(res.data))
//             .catch(err => reject(err));
//     } else {
//         axios.get(`${base_url}/discussionBoard`)
//             .then(res => resolve(res.data))
//             .catch(err => reject(err));
//     }
// });


export const searchPosts = (searchWord) => new Promise((resolve, reject) => {

    const api_params = {
        params: {
            searchWord: searchWord
        }
    }

    axios.get(`${base_url}/newSearchPosts`, api_params)
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

export const postEngadgement = (postID, value) => new Promise((resolve, reject) => {
    if (sessionStorage.getItem("userID")){
        axios.post(`${base_url}/dbnewvote?value=${value}&postID=${postID}&curruserID=${sessionStorage.getItem("userID")}`)
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

export const editPost = (postID, postTitle, postEntry, restricted) => new Promise((resolve, reject) => {
    let params = {
        title: postTitle,
        postEntry: postEntry,
        restricted: restricted ? 1 : 0
    };
    axios.put(`${base_url}/discussionBoard/${postID}`, params)
        .then(res => resolve(res.data))
        .catch(err =>{
            alert(err);
            reject(err);
        });
});


export const getPostsByID = (userID) => new Promise((resolve, reject) => {
    axios.get(`${base_url}/discussionBoard/${userID}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
});

export const getLikedPostsByID = (userID) => new Promise((resolve, reject) => {
    axios.get(`${base_url}/likedPosts/${userID}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
});


export const getDislikedPostsByID = (userID) => new Promise((resolve, reject) => {
    axios.get(`${base_url}/dislikedPosts/${userID}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
});


export const getUserInfoByID = (userID) => new Promise((resolve, reject) => {
    axios.get(`${base_url}/userinfo?userID=${userID}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
});


export const toggleBan = (userID) => new Promise((resolve, reject) => {
    if (sessionStorage.getItem("userID")){
        axios.put(`${base_url}/toggleban?userID=${userID}`)
            .then(res => resolve(res.data))
            .catch(err =>{
                alert(err)
                reject(err)
            });
    }
});


export const getBannedUsers = () => new Promise((resolve, reject) => {
    setTimeout(() =>{
        axios.get(`${base_url}/bannedUsers`)
            .then(res => {
                console.log(res.data);
                resolve(res.data);
            })
            .catch(err => reject(err));
    }, 500);

});


export const getStatusByID = (userID) => new Promise((resolve, reject) => {
    axios.get(`${base_url}/requests/status/${userID}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
});


export const requestByID = (text) => new Promise((resolve, reject) => {
    const userID = sessionStorage.getItem("userID");
    const data = {
        text: text,
    }
    if(userID){
        axios.put(`${base_url}/requests/makepending/${userID}`, data)
            .then(res => resolve(res.data))
            .catch(err =>{
                alert(err)
                reject(err)
            });
    }

    
});

export const cancelRequestByID = (userID) => new Promise((resolve, reject) => {
    axios.put(`${base_url}/requests/removepending/${userID}`)
        .then(res => resolve(res.data))
        .catch(err =>{
            alert(err)
            reject(err)
        });
    
});

export const getRequests = () => new Promise((resolve, reject) => {
    axios.get(`${base_url}/requests/pending`)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
});

export const approveRequestByID = (userID) => new Promise((resolve, reject) => {
    axios.put(`${base_url}/requests/approve/${userID}`)
        .then(res => resolve(res.data))
        .catch(err =>{
            alert(err)
            reject(err)
        });
    
});

export const denyRequestByID = (userID) => new Promise((resolve, reject) => {
    axios.put(`${base_url}/requests/reject/${userID}`)
        .then(res => {
            console.log(res.data);
            resolve(res.data)
        })
        .catch(err =>{
            alert(err)
            reject(err)
        });
    
});




export const savePost = (postID) => new Promise((resolve, reject) => {
    if (sessionStorage.getItem("userID")){
        const data = {
            curruserID: sessionStorage.getItem("userID"),
            postID: postID
        };
        axios.post(`${base_url}/savedPost`, data)
            .then(res => resolve(res.data))
            .catch(err =>{
                reject(err)
            });
    }
});


export const unSavePost = (postID) => new Promise((resolve, reject) => {
    if (sessionStorage.getItem("userID")){
        const userID = sessionStorage.getItem("userID")
        axios.delete(`${base_url}/savedPost?userID=${userID}&postID=${postID}`)
            .then(res => resolve(res.data))
            .catch(err =>{
                reject(err)
            });
    }
});


export const getSavedPostsByID = (userID) => new Promise((resolve, reject) => {
    if (sessionStorage.getItem("userID")){
        axios.get(`${base_url}/savedPost?curruserID=${userID}`)
            .then(res => resolve(res.data))
            .catch(err =>{
                reject(err)
            });
    }
});


export const updateUser = (account) => new Promise((resolve, reject) => {
    if (sessionStorage.getItem("userID")){
        const userID = sessionStorage.getItem("userID")
        axios.put(`${base_url}/changeuser?userID=${userID}`,  { ...account })
            .then(res => resolve(res.data))
            .catch(err =>{
                reject(err)
            });
    }
});


