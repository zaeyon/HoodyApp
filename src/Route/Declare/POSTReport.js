import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com';

const POSTReport = (type, targetId, reason) => {
    const url = baseUrl + '/report';

    console.log("신고 type", type);
    console.log("신고 targetId", targetId);
    console.log("신고 reason", reason);

    var formData = new FormData();

    formData.append("type", type);
    formData.append("targetId", targetId);
    formData.append("reason", reason);

    console.log("신고 formData", formData);

    return new Promise(function(resolve, reject) {
        axios
        .post(url, formData)
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

export default POSTReport;