import React, {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components/native';
import useDimensions from 'react-use-dimensions';
import {
  TouchableWithoutFeedback,
  Text,
  FlatList,
  Animated,
  View,
  PanResponder,
  UIManager,
  findNodeHandle,
  Platform,
  PixelRatio,
} from 'react-native';
import {BoxShadow} from 'react-native-shadow';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DraggableFlatList from 'react-native-draggable-flatlist';

const Container = Styled.View`
 flex: 1;
 background-color: #ffffff;
 
`;

const TextParagraphContainer = Styled.View`
 padding: 15px;
 border-bottom-width: 0.3px;
 border-top-width: 0.3px;
 border-color: #c3c3c3;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 background-color: #ffffff;
`;

const DescriptionText = Styled.Text`
`;

const ImageParagraphContainer = Styled.View`
 padding: 15px;
 border-bottom-width: 0.2px;
 border-top-width: 0.2px;
 border-color: #c3c3c3;
 flex-direction: row;
 justify-content: space-between;
 align-items:center;
 background-color: #ffffff;
`;

const InsertedImage = Styled.Image`
 width: ${wp('20%')};
 height: ${wp('20%')};
`;

const ParagraphIcon = Styled.Image`
 width: 20px;
 height: 20px;
`;

const ParagraphDivider = ({navigation, route}: Props) => {
  const [descriptionPara, setDescriptionPara] = useState();
  const [scrollToHeight, setScrollToHeight] = useState(0);
  const [vheight, setVheight] = useState(0);
  const [vwidth, setVwidth] = useState(0);
  const [vpx, setVpx] = useState(0);
  const [vpy, setVpy] = useState(0);
  const [vfx, setVfx] = useState(0);
  const [vx, setVx] = useState(0);
  const [vy, setVy] = useState(0);
  const [nativeEvent, setNativeEvent] = useState(null);
  const [stepRef, stepSize] = useDimensions();
  // const myRef = useRef();
  const [paragraphY, setParagraphY] = useState([]);
  const [paragraphData, setParagraphData] = useState([
    {
      index: 1,
      type: 'description',
      description: '문단나누기 테스트 글글글',
    },
    {
      index: 2,
      type: 'image',
      url: 'https://pbs.twimg.com/media/EA9UJBjU4AAdkCm?format=jpg&name=small',
    },
    {
      index: 3,
      type: 'description',
      description: '문단나누기 테스트 글2',
    },
    {
      index: 4,
      type: 'description',
      description: '문단나누기 테스트 글3',
    },
  ]);

  useEffect(() => {
    if (route.params?.description) {
      console.log('route.params?.description', route.params?.description);
      setDescriptionPara(route.params.description);
    }
  }, [route.params?.description]);

  const changeParagraph = (data) => {
    console.log('changed paragraph', data);
    setParagraphData(data);
  };

  const renderItem = ({item, index, drag, isActive}) => {
    if (item.type === 'description') {
      return (
        <TextParagraphContainer
          style={isActive && {elevation: 4}}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            console.log('height', layout.height);
          }}>
          <DescriptionText>{item.description}</DescriptionText>

          <TouchableWithoutFeedback onLongPress={drag} delayLongPress={0.2}>
            <ParagraphIcon source={require('~/Assets/Images/check.png')} />
          </TouchableWithoutFeedback>
        </TextParagraphContainer>
      );
    } else if (item.type === 'image') {
      return (
        <ImageParagraphContainer
          style={isActive && {elevation: 4}}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            console.log('height222', layout.height);
          }}>
          <InsertedImage source={{uri: item.url}} />
          <TouchableWithoutFeedback onLongPress={drag} delayLongPress={0.2}>
            <ParagraphIcon source={require('~/Assets/Images/check.png')} />
          </TouchableWithoutFeedback>
        </ImageParagraphContainer>
      );
    }
  };

  return (
    <Container>
      <DraggableFlatList
        data={paragraphData}
        renderItem={renderItem}
        onDragEnd={({data}) => changeParagraph(data)}
        keyExtractor={(item, index) => `draggable-item-${item.index}`}
      />
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('ParagraphInput', {
            inputedDescription: descriptionPara,
          })
        }>
        <Container>
          {descriptionPara && (
            <TextParagraphContainer>
              <Text>{descriptionPara}</Text>
            </TextParagraphContainer>
          )}
        </Container>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default ParagraphDivider;

/*
<FlatList
        style={{flex: 1}}
        data={paragraph}
        CellRendererComponent={({item, index}) => {
          if (item.type === 'description') {
            return (
              <Animated.View
                style={{transform: [{translateY: pan.y}]}}
                {...panResponder.panHandlers}>
                <TextParagraphContainer
                  onLayout={(event) => {
                    const layout = event.nativeEvent.layout;
                    console.log('height', layout.height);
                  }}>
                  <DescriptionText>{item.description}</DescriptionText>
                  <ParagraphIcon
                    source={require('~/Assets/Images/check.png')}
                  />
                </TextParagraphContainer>
              </Animated.View>
            );
          } else if (item.type === 'image') {
            return (
              <ImageParagraphContainer
                onLayout={(event) => {
                  const layout = event.nativeEvent.layout;
                  console.log('height222', layout.height);
                }}>
                <InsertedImage source={{uri: item.url}} />
                <ParagraphIcon source={require('~/Assets/Images/check.png')} />
              </ImageParagraphContainer>
            );
          }
        }}
      />
      */
