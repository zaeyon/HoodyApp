import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Styled from 'styled-components/native';
import FeedItem from '~/Components/FeedItem';
import FeedItem2 from '~/Components/FeedItem2';

const FEEDDATA = [
  {
    id: '1',
    profile_image:
      'https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528',
    nickname: '하핳',
    write_time: '29 seconds ago',
    rating: '4.7',
    favoriteCount: '2531',
    image_list:
      'https://www.travel141.co.kr/wp-content/uploads/2017/02/dscf5729.jpg$#$http://m1.daumcdn.net/cfile229/R400x0/9936CA415BBEEE31313B9D',
    tag_list: '을지로&#&맛집&#&하핳',
    review_content: '을지로에있는 맛집 다녀왔어요!',
  },
];

function Feed({navigation}) {
  const ReviewContent =
    '을지로 입구역에서 에어팟을 구입 후 언박싱을 하였다. 언박싱 후 기존의 있었다.';
  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('FeedDetail', {
            content: ReviewContent,
          });
        }}>
        <FeedItem2 />
      </TouchableOpacity>
    </Container>
  );
}

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #FFFFFF;
 align-items: center;
`;

const HeaderBottomWidth = Styled.View`
  width: 100%;
  background-color: #c3c3c3;
`;

export default Feed;

/*
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('FeedDetail', {
            content: ReviewContent,
          });
        }}>
        <FeedItem
          name="hooging"
          photo="https://t1.daumcdn.net/thumb/R600x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fqna%2Fimage%2F1542632018000000528"
          description="을지로 입구역에서 에어팟을 구입 후 언박싱을 하였다. 언박싱 후 기존의 에어팟보다 기능이 좋다는것을 알 수 있었다."
          mainImage="https://cdn.clien.net/web/api/file/F01/9207614/48f0dc3910a37b.jpeg?w=780&h=30000"
          rating="4.5 / 5"
          navigation={navigation}
        />
      </TouchableOpacity>
*/
