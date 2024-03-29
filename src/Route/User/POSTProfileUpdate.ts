import axios from 'axios';
const baseUrl = 'http://hoody-api-test-server-alb-349396782.ap-northeast-2.elb.amazonaws.com';

const POSTProfileUpdate = ( description: string, profileImage?: object, nickname?: string) => {
  const url = baseUrl + '/user/profile/update';

  console.log("수정된 nickname", nickname);
  console.log("수정된 description", description);
  console.log("수정된 profileImage", profileImage);

  var form = new FormData();

      if(nickname) {
      form.append("nickname", nickname);
      }

      form.append(`profileImg`, 
      {
          uri: profileImage.uri,
          name: profileImage.filename.toLowerCase(),
          type: 'image/jpeg',
      });
      
      form.append("description", description);

      console.log("POSTProfileUpdate", form);

      return new Promise(function(resolve, reject) {
      axios
      .post(url, form)
      .then(function(response) {
          resolve(response);
      })
      .catch(function(error) {
          reject(error.response);
      })
  })
}

export default POSTProfileUpdate;

