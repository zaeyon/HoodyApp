import React, {useEffect, useState} from 'react';
import {
    TouchableWithoutFeedback,
     FlatList,
     ScrollView,
     RefreshControl,
     ActivityIndicator,
    } from 'react-native';
import Styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import {isIphoneX} from 'react-native-iphone-x-helper';

// Local Component
import RecommendUser from '~/Components/Presentational/ExploreScreen/RecommendUser';
import RecommendTagBanner from '~/Components/Presentational/ExploreScreen/RecommendTagBanner';
import PopularTagByAgeGroup from '~/Components/Presentational/ExploreScreen/PopularTagByAgeGroup';
import PopularFeedList from '~/Components/Presentational/ExploreScreen/PopularFeedList';
import RecommendCollectionList from '~/Components/Presentational/ExploreScreen/RecommendCollectionList'; 
import PopularFeedListByLocation from '~/Components/Presentational/ExploreScreen/PopularFeedListByLocation';
import Geolocation from 'react-native-geolocation-service';
import currentUser from '~/reducers/currentUser';

// Route
import GETRecommendUser from '~/Route/Curation/GETRecommendUser';
import GETTrendTags from '~/Route/Curation/GETTrendTags';
import GETAgeGroupPopularTag from '~/Route/Curation/GETAgeGroupPopularTag';
import GETPostsByWroteTags from '~/Route/Curation/GETPostsByWroteTags';
import GETRecommendCollection from '~/Route/Curation/GETRecommendCollection';
import GETHotPlace from '~/Route/Curation/GETHotPlace';

const Container = Styled.SafeAreaView`
 background-color: #ffffff;
`;

const BodyContainer = Styled.View`
 background-color: #ffffff;
`;

const HeaderBar = Styled.View`
 margin-top:16px;
 width: ${wp('100%')};
 height: ${wp('13.8%')};
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 background-color:#ffffff;
 padding-bottom: 7px;
`;

const SearchInputContainer = Styled.View`
align-items: center;
width: ${wp('81%')};
height: 36px;
border-radius: 40px;
background-color: #F3F3F3;
flex-direction: row;
`;

const SearchInput = Styled.TextInput`
 width: ${wp('79%')};
 height: 36px;
 padding-left: ${wp('8%')};
 font-size: 16px;
`;

const SearchInputPlacehoderText = Styled.Text`
font-size: 16px;
color: #c6c7cc;
margin-left: ${wp('9%')};
`;
 

const SearchIcon = Styled.Image`
position: absolute;
left: 13px;
 width: ${wp('4%')};
 height: ${wp('4%')};
 tint-color: #C6C7CC
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

const HeaderMarkerContainer = Styled.View`
padding-left: 6px;
padding-bottom: 13px;
padding-top: 10px;
padding-right: 16px;
justify-content: center;
align-items: center;
background-color: #ffffff;
`;

const HeaderMarkerIcon = Styled.Image`
 width: ${wp('6.4%')};
 height: ${wp('6.4%')};
`;

const RecommendUserContainer = Styled.View`
`;

const RecommendTagBannerContainer = Styled.View`
 margin-top: 10px;
`;

const PopularTagByAgeGroupContainer = Styled.View`
margin-top: 10px;
`;

const PopularFeedListContainer = Styled.View`
`;

const RecommendCollectionContainer = Styled.View`
 margin-top: 10px;
`;

const PopularFeedListByLocationContainer = Styled.View`
 padding-bottom: ${isIphoneX() ? 120 : 130}
`;

const LoadingContainer = Styled.View`
 width: ${wp('100%')};
 height: ${hp('100%')};
 background-color:#FFFFFF;
 align-items: center;
 margin-top: ${hp('35%')};
`;

interface Props {
    navigation: any,
    route: any,
}

const ExploreScreen = ({navigation, route}: Props) => {
    const [currentUserLocation, setCurrentUserLocation] = useState<object>({
        latitude: 0,
        longitude: 0,
    });
    const [recommendUserListData, setRecommendUserListData] = useState<Array<object>>([]);
    const [trendTagsListData, setTrendTagsListData] = useState<Array<object>>([]);
    const [ageGroupPopularTagListData, setAgeGroupPopularTagListData] = useState<Array<object>>([
        {
            tagName: '',
            tagPosts: [],
            selected: false,
        }
    ]);
    const [selectedPopularTagIndex, setSelectedPopularTagIndex] = useState<number>(0);
    const [postsByWroteTagListData, setPostsByWroteTagListData] = useState<Array<object>>([]);
    const [recommendMainCollectionListData, setRecommendMainCollectionListData] = useState<Array<object>>([]);
    const [recommendSubCollectionListData, setRecommendSubCollectionListData] = useState<Array<object>>([]);
    const [hotPlaceData, setHotPlaceData] = useState<object>({});
    const [refreshingRecommendData, setRefreshingRecommendData] = useState<boolean>(false);

    const [loadingRecommendUser, setLoadingRecommendUser] = useState<boolean>(true);
    const [loadingTrendTag, setLoadingTrendTag] = useState<boolean>(true);
    const [loadingPopularTag, setLoadingPopularTag] = useState<boolean>(true);

    const [loadingAll, setLoadingAll] = useState<boolean>(true);

    useEffect(() => {
        getRecommendData()
    }, [])

    const getRecommendData = () => {
        GETRecommendUser()
        .then(function(response) {
            console.log("GETRecommendUser response", response);
            setRecommendUserListData(response);
            setLoadingRecommendUser(false);
        })
        .catch(function(error) {
            console.log("GETRecommendUser error", error);
        })

        GETTrendTags()
        .then(function(response) {
            console.log("GETTrendTags response", response);
            setTrendTagsListData(response);
            setLoadingTrendTag(false);
        })
        .catch(function(error) {
            console.log("GETTrendTags error", error);
        })

        GETAgeGroupPopularTag()
        .then(function(response) {
            setLoadingPopularTag(false);
            var tmpAgeGroupPopularTagListData = new Array();
            console.log("GETAgeGroupPopularTag response", response);
            var index = 0;
            for(const[key, value] of Object.entries(response)) {
                tmpAgeGroupPopularTagListData.push({
                    tagName: key,
                    tagPosts: value,
                    selected: index == 0 ? true : false,
                })
                index = index + 1;
            }
            setAgeGroupPopularTagListData(tmpAgeGroupPopularTagListData);
        })
        .catch(function(error) {
            console.log("GETAgeGroupPopularTag error", error);
        })

        GETPostsByWroteTags()
        .then(function(response) {
            console.log("GETPostsByWroteTags response", response)
            setPostsByWroteTagListData(response);
        })
        .catch(function(error) {
            console.log("GETPostsByWroteTags error", error);
        })

        GETRecommendCollection()
        .then(function(response) {
            console.log("GETRecommendCollection response", response)
            setRecommendMainCollectionListData(response.slice(0, 2));
            setRecommendSubCollectionListData(response.slice(2));
        })
        .catch(function(error) {
            console.log("GETRecommendCollection error", error);
        })

        setTimeout(() => {
            GETHotPlace()
            .then(function(response) {
                console.log("GETHotPlace response", response)
                setHotPlaceData(response);
                setRefreshingRecommendData(false);
                setLoadingAll(false);
            })
            .catch(function(error) {
                console.log("GETHotPlace error", error);
            })
        }, 100)


    }

    const onRefreshRecommendData = () => {
        setRefreshingRecommendData(true);
        setSelectedPopularTagIndex(0);
        setTimeout(() => {
            getRecommendData()
        }, 10)
    }

    const moveToNearFeedMap = () => {
        console.log("currentLocation", currentUserLocation);
        navigation.navigate("NearFeedMapScreen")
    }

    const selectPopularTag =(item:object, index:number) => {
        var tmpPopularTagList = ageGroupPopularTagListData.map(function(tag, index2) {
            if(index !== index2) {
                tag.selected = false
                return tag
            } else if(index === index2) {
                tag.selected = true
                return tag
            }
        })

        setSelectedPopularTagIndex(index);
        setAgeGroupPopularTagListData(tmpPopularTagList);
        
    }
    return (
        <Container>
            <HeaderBar>
                <HeaderSearchContainer>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("SearchScreen")}>
                    <SearchInputContainer>
                        <SearchInputPlacehoderText>검색</SearchInputPlacehoderText>
                        <SearchIcon
                        source={require('~/Assets/Images/ic_search_explore.png')}/>
                    </SearchInputContainer>
                    </TouchableWithoutFeedback>
                </HeaderSearchContainer>
                <TouchableWithoutFeedback onPress={() => moveToNearFeedMap()}>
                <HeaderMarkerContainer>
                    <HeaderMarkerIcon
                    source={require('~/Assets/Images/HeaderBar/ic_marker_selected2.png')}/>
                </HeaderMarkerContainer>
                </TouchableWithoutFeedback>
            </HeaderBar>
            {loadingAll && (
            <LoadingContainer>
                <ActivityIndicator/>
            </LoadingContainer>
            )}
            {!loadingAll && (
            <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                refreshing={refreshingRecommendData}
                onRefresh={onRefreshRecommendData}/>
            }>
            <BodyContainer>
            <RecommendUserContainer>
            <RecommendUser
            loadingRecommendUser={loadingRecommendUser}
            navigation={navigation}
            recommendUserListData={recommendUserListData}
            />
            </RecommendUserContainer>
            <RecommendTagBannerContainer>
            <RecommendTagBanner
            loadingTrendTag={loadingTrendTag}
            trendTagsListData={trendTagsListData}
            navigation={navigation}
            />
            </RecommendTagBannerContainer>
            <PopularTagByAgeGroupContainer>
                <PopularTagByAgeGroup
                loadingPopularTag={loadingPopularTag}
                navigation={navigation}
                ageGroupPopularTagListData={ageGroupPopularTagListData}
                selectPopularTag={selectPopularTag}
                selectedPopularTagIndex={selectedPopularTagIndex}
                />
            </PopularTagByAgeGroupContainer>
            <PopularFeedListContainer>
                <PopularFeedList
                navigation={navigation}
                postsByWroteTagListData={postsByWroteTagListData}
                />
            </PopularFeedListContainer>
            <RecommendCollectionContainer>
                <RecommendCollectionList
                navigation={navigation}
                recommendMainCollectionListData={recommendMainCollectionListData}
                recommendSubCollectionListData={recommendSubCollectionListData}
                />
            </RecommendCollectionContainer>
            <PopularFeedListByLocationContainer>
                <PopularFeedListByLocation
                navigation={navigation}
                hotPlaceData={hotPlaceData}
                />
            </PopularFeedListByLocationContainer>
            </BodyContainer>
            </ScrollView>
            )}
        </Container>
    )
}

export default ExploreScreen;





