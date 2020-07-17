import React from 'react';
import {
    TouchableWithoutFeedback,
     FlatList,
     ScrollView,
    } from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import RecommandUser from '~/Components/Presentational/ExploreScreen/RecommandUser';
import RecommandTagBanner from '~/Components/Presentational/ExploreScreen/RecommandTagBanner';
import PopularTagByAgeGroup from '~/Components/Presentational/ExploreScreen/PopularTagByAgeGroup';
import PopularFeedList from '~/Components/Presentational/ExploreScreen/PopularFeedList';

const Container = Styled.SafeAreaView`
 flex: 1;
 background-color: #ffffff;
`;

const BodyContainer = Styled.ScrollView`
 background-color: #ffffff;
`;


const HeaderBar = Styled.View`
 width: ${wp('100%')};
 height: ${hp('6.5%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
`;

const HeaderLeftContainer = Styled.View`
padding: 10px 15px 10px 15px;
align-items: center;
justify-content: center;
`;

const HeaderTitleText = Styled.Text`
 font-weight: 600;
 font-size: 24px;
 color: #333333;
`;

const HeaderRightContainer = Styled.View`
 flex-direction: row;
`;

const HeaderSearchContainer = Styled.View`
padding: 10px 8px 10px 15px
 align-items: center;
 justify-content: center;
`;

const HeaderSearchIcon = Styled.Image`
width: ${wp('6.4%')};
height: ${wp('6.4%')};
tint-color: #000000;
`;

const HeaderLocationContainer = Styled.View`
padding: 10px 15px 10px 8px;
align-items: center;
justify-content: center;
`;

const HeaderLocationIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
 tint-color: #000000;
`;

const RecommandUserContainer = Styled.View`
`;

const RecommandTagBannerContainer = Styled.View`
 margin-top: 10px;
`;

const PopularTagByAgeGroupContainer = Styled.View`
margin-top: 10px;
`;

const PopularFeedListContainer = Styled.View`
`;

interface Props {
    navigation: any,
    route: any,
}

const ExploreScreen = ({navigation, route}: Props) => {

    return (
        <Container>
            <HeaderBar>
            <HeaderLeftContainer>
                <HeaderTitleText>탐색</HeaderTitleText>
            </HeaderLeftContainer>
            <HeaderRightContainer>
                <HeaderSearchContainer>
                    <HeaderSearchIcon
                    source={require('~/Assets/Images/ic_header_search.png')}/>
                </HeaderSearchContainer>
                <HeaderLocationContainer>
                    <HeaderLocationIcon
                    source={require('~/Assets/Images/ic_header_location.png')}/>
                </HeaderLocationContainer>
            </HeaderRightContainer>
            </HeaderBar>
            <BodyContainer
            showsVerticalScrollIndicator={false}
            >
            <RecommandUserContainer>
            <RecommandUser/>
            </RecommandUserContainer>
            <RecommandTagBannerContainer>
            <RecommandTagBanner/>
            </RecommandTagBannerContainer>
            <PopularTagByAgeGroupContainer>
                <PopularTagByAgeGroup/>
            </PopularTagByAgeGroupContainer>
            <PopularFeedListContainer>
                <PopularFeedList/>
            </PopularFeedListContainer>
            </BodyContainer>
        </Container>
    )
}

export default ExploreScreen;





