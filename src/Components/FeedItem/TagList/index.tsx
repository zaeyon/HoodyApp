import React from 'react';
import Styled from 'styled-components/native';
import {FlatList, Text} from 'react-native';

interface Props {
  tags: Array<String>;
}

const Container = Styled.View`
 margin: -4px 15px;
`;

const Tag = Styled.Text`
 flex: 1;
 font-size: 16px;
 margin-right: 4px;
`;

const TagList = ({tags}: Props) => {
  return (
    <Container>
      <FlatList
        data={tags}
        horizontal={true}
        renderItem={({item}) => (
          <Tag style={{fontFamily: 'Arita4.0_B'}}>{item.tag}</Tag>
        )}
      />
    </Container>
  );
};

export default TagList;
