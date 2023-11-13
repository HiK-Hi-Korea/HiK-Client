import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';

interface CopyBtnProps {
  //   source: string;
  onPress: () => void;
}

export const CopyBtn: React.FC<CopyBtnProps> = props => {
  return (
    <ButtonContainer onPress={props.onPress()}>
      <Image
        // eslint-disable-next-line react-native/no-inline-styles
        style={{height: 25, width: 25}}
        source={require('../assets/icons/Copy.png')}
      />
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;
