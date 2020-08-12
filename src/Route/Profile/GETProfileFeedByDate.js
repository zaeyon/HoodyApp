import axios from 'axios';
const baseUrl = 'https://dac549af8a8b.ngrok.io';

const GETProfileFeedByDate = (nickname, requestedDate) => {
    const url = baseUrl + '/user/profile?nickname=' + nickname + "&type=post&view=listByDate&yearMonth=" + requestedDate;

    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            resolve(response.data)
            console.log("GETProfileFeedByDate response", response.data);
        })
        .catch(function(error) {
            reject(error);
            console.log("GETProfileFeedByDate error", error)
        })
    })
}

export default GETProfileFeedByDate;