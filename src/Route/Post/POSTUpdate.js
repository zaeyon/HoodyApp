import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com'; 


const POSTUpdate = (postId, desArray, mediaArray,mainTag, subTag1, subTag2, rating, expense,  location, longitude, latitude, certifiedLocation, dump, sequence, products, spendDate, openState, subTag1Edit, subTag2Edit, subTag1Exis, subTag2Exis) => {
    const url = baseUrl + "/post/update?postId=" + postId;

    console.log("postId", postId);

    console.log("수정할 사진", mediaArray);
    console.log("업로드할 desArray", desArray);
    console.log("업로드할 상품", products);
    console.log("게시글 수정 spendDate", spendDate);

    console.log("업로드 expense", expense);

    console.log("업로드 subTag1", subTag1);
    console.log("업로드 subTag2", subTag2);
    console.log("업로드 subTag1Edit", subTag1Edit)
    console.log("업로드 subTag2Edit", subTag2Edit);
    console.log("업로드 subTagOneExis", subTag1Exis);
    console.log("업로드 subTagTwoExis", subTag2Exis);

    var form = new FormData();


    for(var i = 0; i < mediaArray.length; i++) {
        form.append(`mediaFile`, {
            uri: mediaArray[i].uri,
            name: mediaArray[i].image.filename.toLowerCase(),
            type: 'image/jpeg',
        })
    }
    
    form.append('descriptions', desArray);
    form.append('starRate', rating);
    form.append('expense', expense);
    form.append('address', location);
    form.append('geographLong', longitude);
    form.append('geographLat', latitude);
    form.append('certifiedLocation', certifiedLocation);
    form.append('mainTag', mainTag);
    form.append('subTagOne', subTag1);
    form.append('subTagTwo', subTag2);
    form.append('temporary', dump);
    form.append('sequences', sequence);
    form.append('products', products);
    form.append("spendDate", spendDate);
    form.append('open', openState);

//    form.append('subTagOneEdit', subTag1Edit);
//    form.append('subTagTwoEdit', subTag2Edit);
    form.append('subTagOneExistence', subTag1Exis);
    form.append('subTagTwoExistence', subTag2Exis);
    
    console.log("FormData", form);
    
    
    return new Promise(function(resolve, reject) {
        axios
        .post(url, form, {
          headers: {
              'Content-Type': 'multipart/form-data',
              Accept: '*/*'
          },  
        })
        .then(function(response) {
            console.log('response: ', response);
            resolve(response);
        })
        .catch(function(error) {
            console.log('error: ', error);
            reject(error.response);
        })
    })
}


export default POSTUpdate;