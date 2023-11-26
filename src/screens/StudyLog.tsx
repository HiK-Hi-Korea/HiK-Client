import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

const TestData = [
  {
    date: 'NOV 15th, 2023',
    title: 'Hi Professor I have a question',
    filter: ['university', 'professor', 'intimacy 1'],
  },
  {
    date: 'NOV 15th, 2023',
    title: 'How much is it?',
    filter: ['store', 'staff', 'intimacy 1'],
  },
  {
    date: 'NOV 16th, 2023',
    title: 'I want to meet you',
    filter: ['online-transaction', 'buyer', 'intimacy 1'],
  },
  {
    date: 'NOV 17th, 2023',
    title: 'Hi Korea',
    filter: ['university', 'friend', 'intimacy 3'],
  },
  {
    date: 'NOV 17th, 2023',
    title: 'where is the bus stop',
    filter: ['university', 'elder', 'intimacy 1'],
  },
];

function StudyLog({navigation}) {
  return (
    <SafeAreaView>
      <ScrollView>
        <Wrapper>
          {TestData.map((element, idx) => {
            return (
              <TouchableOpacity
                style={styles.touchableStyle}
                onPress={() => navigation.navigate('log')}>
                <TextBox key={idx}>
                  <Text style={styles.textStyle}>{element.date}</Text>
                  <Text style={styles.titleStyle}>{element.title}</Text>
                  <FilterWrapper>
                    {element.filter.map(filterOne => {
                      return (
                        <FilterBox>
                          <Text style={styles.filterStyle}>{filterOne}</Text>
                        </FilterBox>
                      );
                    })}
                  </FilterWrapper>
                </TextBox>
              </TouchableOpacity>
            );
          })}
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
}

export default StudyLog;

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
`;

const TextBox = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: whitesmoke;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px 10px 20px 10px;
  gap: 5px;
`;

const FilterWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 5px;
`;

const FilterBox = styled.View`
  display: flex;
  padding: 2px 8px 2px 8px;
  background-color: #c9c9c9;
  border: 1px solid #c9c9c9;
  border-radius: 10px;
`;

const styles = StyleSheet.create({
  touchableStyle: {
    width: 350,
  },
  textStyle: {
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
});
