import axios from 'axios';

const base_url = 'http://localhost:8000';

export const getPosts = (id) => new Promise((resolve, reject) => {
    axios.get(`${base_url}/discussionBoard`)
        .then(res => resolve(res.data))
        .catch(err =>{
            alert(err)
            reject(err)
        });
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