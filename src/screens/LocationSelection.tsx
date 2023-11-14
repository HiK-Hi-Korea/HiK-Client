import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import {useRecoilState} from 'recoil';
import {LocationTypeAtom} from '../assets/recoilValues';
import styled from 'styled-components/native';

export default function LocationSelection({navigation}) {
  const [selectedLoc, setSelectedLoc] = useRecoilState(LocationTypeAtom);
  return (
    <SafeAreaView>
      <Title>
        <TitleText>Select Your Location</TitleText>
      </Title>
      <Picker
        selectedValue={selectedLoc}
        onValueChange={itemValue => setSelectedLoc(itemValue)}>
        <Picker.Item label="store" value="store" />
        <Picker.Item label="university" value="university" />
        <Picker.Item label="online-transaction" value="online-transaction" />
      </Picker>
      <Button
        title="Translation"
        onPress={() => navigation.navigate('Home', {screen: 'Translation'})}
      />
    </SafeAreaView>
  );
}

const Title = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30%;
`;

const TitleText = styled.Text`
  color: rgba(21, 86, 254, 1);
  font-size: 20px;
  font-weight: bold;
`;
