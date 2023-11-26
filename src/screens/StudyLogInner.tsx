import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import styled from 'styled-components/native';

const TestData = [
  {
    rawSentence: 'Hi Professor I have a question',
    transSentence: '교수님 질문이 있어요',
  },
  {
    rawSentence: 'HiK',
    transSentence: '안녕 한국!',
  },
  {
    rawSentence: 'HiK',
    transSentence: '안녕 한국!',
  },
  {
    date: 'NOV 15th, 2023',
    rawSentence: 'HiK',
    transSentence: '안녕 한국!',
  },
];

export default function StudyLogInner({navigation}) {
  const date = 'NOV 15th, 2023';
  const filter = ['university', 'professor', 'intimacy 1'];
  return (
    <SafeAreaView>
      <ScrollView>
        <Wrapper>
          <Text style={styles.textStyle}>{date}</Text>
          <FilterWrapper>
            {filter.map(filterOne => {
              return (
                <FilterBox>
                  <Text style={styles.filterStyle}>{filterOne}</Text>
                </FilterBox>
              );
            })}
          </FilterWrapper>
          {TestData.map(data => {
            return (
              <TouchableOpacity
                style={styles.touchableStyle}
                onPress={() => navigation.navigate('remake')}>
                <OpacityWrapper>
                  <TextBox>
                    <Text style={styles.titleStyle}>{data.rawSentence}</Text>
                    <Text style={styles.textStyle}>Translated into...</Text>
                    <Text style={styles.titleStyle}>{data.transSentence}</Text>
                  </TextBox>
                  <Image
                    style={styles.chevronStyle}
                    source={require('../assets/icons/ChevronRight.png')}
                  />
                </OpacityWrapper>
              </TouchableOpacity>
            );
          })}
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
}

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
`;

const FilterWrapper = styled.View`
  display: flex;
  width: 85%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
  gap: 5px;
`;

const FilterBox = styled.View`
  display: flex;
  padding: 2px 8px 2px 8px;
  background-color: #c9c9c9;
  border: 1px solid #c9c9c9;
  border-radius: 10px;
`;

const OpacityWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: whitesmoke;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px 10px 20px 10px;
`;

const TextBox = styled.View`
  display: flex;
  flex-direction: column;
  width: 90%;
  gap: 10px;
`;

const styles = StyleSheet.create({
  touchableStyle: {
    width: 350,
  },
  textStyle: {
    width: 330,
    alignContent: 'flex-start',
    fontSize: 13,
    color: '#565656',
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterStyle: {
    color: 'black',
  },
  chevronStyle: {
    width: 10,
    height: 15,
  },
});
