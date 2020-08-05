import axios from 'axios';
const baseUrl = 'https://f5b0c7d7e0a3.ngrok.io';

const GETLogout = () => {
    const url = baseUrl + '/auth/logout';

    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            resolve(response);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default GETLogout;