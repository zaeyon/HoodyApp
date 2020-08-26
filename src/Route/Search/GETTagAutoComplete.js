import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-1622974409.ap-northeast-2.elb.amazonaws.com/'

const GETTagAutoComplete = (query) => {
    console.log("입력된 검색 키워드", query);

    const url = baseUrl + "/search/tag?q=" + query;
    
    return new Promise(function(resolve, reject) {
        axios
        .get(url)
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error)
        })
    })
}

export default GETTagAutoComplete;