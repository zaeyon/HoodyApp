import axios from 'axios';
const baseUrl = 'https://5639a4004695.ngrok.io';

const GetProfileCollection = (nickname) => {
    const url = baseUrl + '/user/profile?nickname=' + nickname + "&type=collection";

    console.log("GetProfileCollection nickname", nickname);

    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            resolve(response.data)
            console.log("프로필 콜렉션 정보", response.data);
        })
        .catch(function(error) {
            reject(error);
        });
    })
}

export default GetProfileCollection;