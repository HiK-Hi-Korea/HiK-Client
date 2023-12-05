import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRecoilValue} from 'recoil';
import styled from 'styled-components/native';
import {UserIdAtom} from '../assets/recoilValues';
import {useFocusEffect} from '@react-navigation/native';

type StudyLogReturnVals = {
  id: number;
  place: string;
  listener: string;
  intimacy: number;
  timestamp: string;
  mainSentence: string;
};

function StudyLog({navigation: {navigate}, route}) {
  const userIdAtomVal = useRecoilValue(UserIdAtom);
  const [datas, setDatas] = useState<StudyLogReturnVals[] | undefined>(
    undefined,
  );

  const getStudyLogLists = async () => {
    try {
      const response = await fetch(
        'http://ec2-15-164-210-1.ap-northeast-2.compute.amazonaws.com:8080/user/showListDto',
        {
          method: 'GET',
          headers: {
            'X-UserId': userIdAtomVal,
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

  // React.useEffect(() => {
  //   route.params.setIsShown(true);
  //   getStudyLogLists();
  // }, [useIsFocused]);
  useFocusEffect(
    React.useCallback(() => {
      route.params.setIsShown(true);
      getStudyLogLists();
    }, []),
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <Wrapper>
          <TitleBox>
            <Text style={styles.infoPageTitleStyle}>Study Logs</Text>
            <View style={{height: 10}} />
            <Text style={styles.textStyle}>
              Record your conversation in 5 minutes with the one who have same
              intimacy in the same place.
            </Text>
            <View style={{height: 20}} />
          </TitleBox>
          {datas &&
            datas.map((element, idx) => {
              return (
                <TouchableOpacity
                  key={idx}
                  style={styles.touchableStyle}
                  onPress={() => navigate('Conversation', {id: element.id})}>
                  <TextBox key={idx}>
                    <Text style={styles.textStyle}>
                      {element.timestamp.split('T')[0]}
                    </Text>
                    <Text style={styles.titleStyle}>
                      {element.mainSentence}
                    </Text>
                    <FilterWrapper>
                      <FilterBox>
                        <Text style={styles.filterStyle}>{element.place}</Text>
                      </FilterBox>
                      <FilterBox>
                        <Text style={styles.filterStyle}>
                          {element.listener}
                        </Text>
                      </FilterBox>
                      <FilterBox>
                        <Text style={styles.filterStyle}>
                          {element.intimacy}
                        </Text>
                      </FilterBox>
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

const TitleBox = styled.View`
  display: flex;
  width: 90%;
  flex-direction: flex-start;
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
  infoPageTitleStyle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
