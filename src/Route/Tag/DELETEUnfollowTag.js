import axios from 'axios';
const baseUrl = 'https://dac549af8a8b.ngrok.io';

const DELETEUnfollowTag = (tagId) => {
    const url = baseUrl + '/tag/unfollow?tagId=' + tagId;

    return new Promise(function(resolve, reject) {
        axios
        .delete(url)
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default DELETEUnfollowTag;