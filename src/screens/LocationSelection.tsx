import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {Button, SafeAreaView} from 'react-native';
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
        <Picker.Item label="university" value="university" />
        <Picker.Item label="school" value="school" />
        <Picker.Item label="store" value="store" />
        <Picker.Item label="swimming pool" value="swimming pool" />
        <Picker.Item label="library" value="library" />
        <Picker.Item label="gym" value="gym" />
        <Picker.Item label="movie_theater" value="movie_theater" />
        <Picker.Item label="convenience_store" value="convenience_store" />
        <Picker.Item label="restaurant" value="restaurant" />
        <Picker.Item label="taxi_stand" value="taxi_stand" />
        <Picker.Item label="train_station" value="train_station" />
        <Picker.Item label="subway_station" value="subway_station" />
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
