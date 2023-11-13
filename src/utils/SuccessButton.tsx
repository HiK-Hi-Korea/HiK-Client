import React from 'react';
import styled from 'styled-components/native';

interface ButtonProps {
  title: string;
}

const SuccessButton: React.FC<ButtonProps> = props => {
  return (
    <ButtonContainer>
      <Title>{props.title}</Title>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  width: 30%;
  padding: 5px 0 5px 0;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.1);
  background-color: rgba(21, 86, 254, 1);
  margin-top: 20px;
`;

const Title = styled.Text`
  color: #ffffff;
`;

export default SuccessButton;
