import React, { useEffect, useState } from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/native';
import { UserIdAtom } from '../assets/recoilValues';

type TransReturnVals = {
  id: number;
  srcSentence: string;
  place: string;
  listener: string;
  intimacy: number;
  translatedSentence: string;
  voiceFile: string;
  timestamp: string;
};

export default function StudyLogInner({navigation: {navigate}, route}) {
  const userIdAtomVal = useRecoilValue(UserIdAtom);
  const [datas, setDatas] = useState<TransReturnVals[] | undefined>(undefined);
  const getStudyLogInnerContents = async (id: number) => {
    try {
      const response = await fetch(
        'http://ec2-15-164-210-1.ap-northeast-2.compute.amazonaws.com:8080/content/getSentences',
        {
          method: 'GET',
          headers: {
            'X-UserId': userIdAtomVal,
            'X-ContentId': `${id}`,
          },
        },
      );
      const json = await response.json();
      setDatas(json);
      console.log(json.voiceFile);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    route.params.setIsShown(false);
    getStudyLogInnerContents(route.params.id);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {datas && (
          <Wrapper>
            <Text style={styles.textStyle}>
              {datas[0].timestamp.split('T')[0]}
            </Text>
            <FilterWrapper>
              <FilterBox>
                <Text style={styles.filterStyle}>{datas[0].place}</Text>
              </FilterBox>
              <FilterBox>
                <Text style={styles.filterStyle}>{datas[0].listener}</Text>
              </FilterBox>
              <FilterBox>
                <Text style={styles.filterStyle}>{datas[0].intimacy}</Text>
              </FilterBox>
            </FilterWrapper>
            {datas.map((data, idx) => {
              return (
                <TouchableOpacity
                  key={idx}
                  style={styles.touchableStyle}
                  onPress={() =>
                    navigate('Others', {
                      input_sentence: data.srcSentence,
                      prev_translated: data.translatedSentence,
                      prev_place: data.place,
                      prev_listener: data.listener,
                      prev_intimacy: data.intimacy,
                    })
                  }>
                  <OpacityWrapper>
                    <TextBox>
                      <Text style={styles.titleStyle}>{data.srcSentence}</Text>
                      <Text style={styles.textStyle}>Translated into...</Text>
                      <Text style={styles.titleStyle}>
                        {data.translatedSentence}
                      </Text>
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
        )}
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
