import React, {useState, useEffect, useLayoutEffect} from 'react';
import Styled from 'styled-components/native';
import {
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import TileFeedItem from '~/Components/Presentational/ExploreScreen/TileFeedItem';

import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder'

const Container = Styled.View`
 background-color: #ffffff;
`;

const HeaderContainer = Styled.View`
 padding-top: 20px
 padding-left: 16px;
 padding-right: 16px;
 padding-bottom: 8px;
 background-color: #ffffff;
`;

const AgeGroupText = Styled.Text`
 font-weight: 600;
 font-size: 18px;
 color: #333333;
`;

const PopularTagListContainer = Styled.View`
padding-top: 2px;
padding-bottom: 4px;
flex-direction: row;
`;

const PopularTagItemBackground = Styled.View`
 margin-left: 6px;
 height: ${wp('8%')};
 justify-content: center;
 align-items: center;
 padding-left: 14px;
 padding-right: 14px;
 border-width: 1px;
 border-color: #ECECEE;
 border-radius: 7px;
 background-color: #F5F5F7;
`;

const UnselectPopularTagNameText = Styled.Text`
 font-weight: 600;
 font-size: 14px;
 color: #8E9199;
`;

const SelectTagFeedListContainer = Styled.View`
 
`;

  interface Props {
    navigation: any,
    ageGroupPopularTagListData: Array<object>,
    selectPopularTag: (item:number, index:number) => 0,
    selectedPopularTagIndex: number,
    loadingPopularTag: boolean,
  }

const PopularTagByAgeGroup = ({navigation, ageGroupPopularTagListData, selectPopularTag, selectedPopularTagIndex, loadingPopularTag}: Props) => {
   
    const renderPopularTagItem = ({item, index}: any) => {
      console.log("renderPopularTagItem", item);
        return (
          
            <TouchableWithoutFeedback onPress={() => selectPopularTag(item, index)}>
            <PopularTagItemBackground style={[index === 0 &&  styles.firstTagItem || index === ageGroupPopularTagListData.length-1 && styles.lastTagItem, item.selected && styles.selectTagBackground]}>
                <UnselectPopularTagNameText style={item.selected && styles.selectTagText}>{"#" + item.tagName}</UnselectPopularTagNameText>
            </PopularTagItemBackground>
            </TouchableWithoutFeedback>
        )
    }

    const renderSelectTagFeedItem = ({item, index}: any) => {
     console.log("선택된 태그 피드 아이템", item)
        return (
            <TileFeedItem
            feedId={item.id}
            navigation={navigation}
            mainImageUri={item.mediaFiles[0] ? item.mediaFiles[0].url : ""}
            mainTag={item.mainTags.name}
            rating={item.starRate}
            expense={item.expense}
            address={item.address.address}
            />
        )
    }

    return (
        <Container>
            <HeaderContainer>
                <AgeGroupText>20대 인기 태그</AgeGroupText>
            </HeaderContainer>
            {loadingPopularTag && (
              <Placeholder
              Animation={Fade}>
              <PopularTagListContainer>
                <PlaceholderLine
                style={{width:71,height:wp('8%'),borderRadius:7, marginLeft:16}}/>
                <PlaceholderLine
                style={{width:71,height:wp('8%'),borderRadius:7, marginLeft:6}}/>
                <PlaceholderLine
                style={{width:71,height:wp('8%'),borderRadius:7, marginLeft:6}}/>
                <PlaceholderLine
                style={{width:71,height:wp('8%'),borderRadius:7, marginLeft:6}}/>
                <PlaceholderLine
                style={{width:71,height:wp('8%'),borderRadius:7, marginLeft:6}}/>
              </PopularTagListContainer>
              <SelectTagFeedListContainer>
                
              </SelectTagFeedListContainer>
              </Placeholder>
            )}
            {!loadingPopularTag && (
            <View>
            <PopularTagListContainer>
            <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={ageGroupPopularTagListData}
            renderItem={renderPopularTagItem}/>
            </PopularTagListContainer>
            <SelectTagFeedListContainer>
                <FlatList
                scrollEnabled={false}
                contentContainerStyle={{paddingLeft:16, paddingRight:16}}
                columnWrapperStyle={{marginTop:8}}
                numColumns={2}
                data={ageGroupPopularTagListData[selectedPopularTagIndex].tagPosts}
                renderItem={renderSelectTagFeedItem}
                />
            </SelectTagFeedListContainer>
            </View>
            )}
        </Container>
    )
}

const styles = StyleSheet.create({
    firstTagItem : {
        marginLeft: 16
    },
    lastTagItem : {
        marginRight: 16,
    },
    selectTagBackground : {
        backgroundColor: '#267DFF',
        borderWidth: 1,
        borderColor: '#267DFF',
        borderRadius: 7,
    },
    selectTagText: {
        color: '#FFFFFF'
    }
})

export default PopularTagByAgeGroup;