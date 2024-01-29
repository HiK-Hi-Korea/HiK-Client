import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import styled from 'styled-components/native';
import IntimacyBtn from '../utils/IntimacyBtn';
import FilterBtn, {personFilterType} from '../utils/FilterBtn';
import {
  GeneralFilter,
  OnlineFilter,
  SchoolFilter,
  StoreFilter,
  UnivFilter,
} from '../assets/filterValues';
import {useRecoilValue} from 'recoil';
import {
  IntimacyFilterAtom,
  LocationTypeAtom,
  PersonFilterAtom,
  UserIdAtom,
} from '../assets/recoilValues';
import PlaceSelectBtn from '../utils/PlaceSelectBtn';
import SuccessButton from '../utils/SuccessButton';
import GenerateButton from '../utils/GenerateButton';
import {useFocusEffect} from '@react-navigation/native';

export default function StudyOtherFilter({navigation: {navigate}, route}) {
  const personAtomVal = useRecoilValue(PersonFilterAtom);
  const locationAtomVal = useRecoilValue(LocationTypeAtom);
  const intimacyAtomVal = useRecoilValue(IntimacyFilterAtom);
  const userIdAtomVal = useRecoilValue(UserIdAtom);

  const [location, setLocation] = React.useState<string>(locationAtomVal);
  const [items, setItems] = React.useState<personFilterType[]>();
  const [pressed, setPressed] = React.useState(false);
  const [translatedReason, setTranslatedReason] = useState<string>();

  const [newTranslation, setNewTranslation] = React.useState<string>();
  const [playUrl, setPlayUrl] = React.useState('');

  // React.useEffect(() => {
  //   console.log('location change');
  //   if (location === 'university') {
  //     setItems(() => UnivFilter);
  //   } else if (location === 'store') {
  //     setItems(() => StoreFilter);
  //   } else {
  //     setItems(() => OnlineFilter);
  //   }
  //   console.log(items);
  // }, [location]);

  useFocusEffect(
    React.useCallback(() => {
      console.log('location change');
      if (location === 'university') {
        setItems(UnivFilter);
      } else if (location === 'store') {
        setItems(StoreFilter);
      } else if (location === 'online') {
        setItems(OnlineFilter);
      } else if (location === 'school') {
        setItems(SchoolFilter);
      } else {
        setItems(GeneralFilter);
      }
      console.log(items);
    }, [location]),
  );

  const getOtherTranslation = async () => {
    const data = {
      // input_sentence: route.params.input_sentence,
      // prev_place: route.params.prev_place,
      // prev_listener: route.params.prev_listener,
      // prev_intimacy: route.params.prev_intimacy,
      // cur_place: location,
      // cur_listener: personAtomVal,
      // cur_intimacy: intimacyAtomVal,
      sourceSentence: route.params.input_sentence,
      place: location,
      listener: personAtomVal,
      intimacy: intimacyAtomVal,
    };
    try {
      console.log(data);
      const response = await fetch(
        'http://ec2-15-164-210-1.ap-northeast-2.compute.amazonaws.com:8080/content/getOriginalTranslate',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-UserId': userIdAtomVal,
          },
          body: JSON.stringify(data),
        },
      );
      const json = await response.json();
      console.log(json.voiceFile);
      // console.log(typeof json.translatedSentence);
      setNewTranslation(() => json.translatedSentence);
      setPlayUrl(json.voiceFile);
      // getReason(String(json.translatedSentence));
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const getReason = async () => {
    const data = {
      input_sentence: route.params.prev_translated,
      input_place: route.params.prev_place,
      input_listener: route.params.prev_listener,
      input_intimacy: route.params.prev_intimacy,
      translated_sentence: newTranslation,
      // translated_sentence: translatedString,
      place: location,
      listener: personAtomVal,
      intimacy: intimacyAtomVal,
    };
    try {
      console.log(data);
      // const response = await fetch(
      const response = await fetch(
        'http://ec2-15-164-210-1.ap-northeast-2.compute.amazonaws.com:8080/content/getReason',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-UserId': userIdAtomVal,
          },
          body: JSON.stringify(data),
        },
      );
      const json = await response.json();
      setTranslatedReason(json.reason);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleButtonClicked = () => {
    setPressed(true);
    getOtherTranslation();
    // getReason();
    // setPressed(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      getReason();
    }, [newTranslation]),
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <Wrapper>
          <Text style={styles.textStyle}>Your Input Text is..</Text>
          <TransBox>
            <Text style={styles.titleStyle}>{route.params.input_sentence}</Text>
          </TransBox>
          <Text style={styles.textStyle}>situations are</Text>
          <FilterWrapper>
            <FilterBox>
              <Text style={styles.filterStyle}>{route.params.prev_place}</Text>
            </FilterBox>
            <FilterBox>
              <Text style={styles.filterStyle}>
                {route.params.prev_listener}
              </Text>
            </FilterBox>
            <FilterBox>
              <Text style={styles.filterStyle}>
                {route.params.prev_intimacy}
              </Text>
            </FilterBox>
          </FilterWrapper>
          <FilterContour>
            <Text style={styles.contourStyle}>Result is</Text>
          </FilterContour>
          <TransBox>
            <Text style={styles.titleStyle}>
              {route.params.prev_translated}
            </Text>
          </TransBox>
          <FilterContourRed>
            <Text style={styles.contourStyle}>Make Other Choices</Text>
          </FilterContourRed>
          <FlexRow>
            <Text style={styles.labelStyle}>Place</Text>
            <PlaceSelectBtn setLocation={setLocation} />
          </FlexRow>
          <FlexRow>
            <Text style={styles.labelStyle}>Listener</Text>
            {items && <FilterBtn getFilter={items} />}
          </FlexRow>
          <FlexRow>
            <Text style={styles.labelStyle}>Intimacy</Text>
            <IntimacyBtn setPressed={setPressed} />
          </FlexRow>
          {pressed === true ? (
            newTranslation && translatedReason ? (
              <>
                <TransBox>
                  <Text style={styles.titleStyle}>{newTranslation}</Text>
                </TransBox>
                <TransBox>
                  <Text style={styles.textStyle}>{translatedReason}</Text>
                </TransBox>
              </>
            ) : (
              <ActivityIndicator
                size="small"
                color="#0000ff"
                style={{marginTop: 10}}
              />
            )
          ) : (
            <>
              <GenerateButton
                title="Generate"
                onPress={() => handleButtonClicked}
                // setPressed={setPressed}
                // text={text}
              />
            </>
          )}
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

const TransBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  background-color: whitesmoke;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px 10px 20px 10px;
`;

const FlexRow = styled.View`
  display: flex;
  width: 90%;
  gap: 10px;
  flex-direction: row;
  align-items: center;
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

const FilterContour = styled.View`
  display: flex;
  justify-content: center;
  width: 90%;
  background-color: rgba(21, 86, 254, 1);
  border-radius: 20px;
  padding: 5px 1px 5px 10px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const FilterContourRed = styled.View`
  display: flex;
  justify-content: center;
  width: 90%;
  background-color: rgba(254, 58, 93, 1);
  border-radius: 20px;
  padding: 5px 1px 5px 10px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const styles = StyleSheet.create({
  textStyle: {
    width: 330,
    alignContent: 'flex-start',
    fontSize: 15,
    color: '#565656',
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contourStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  filterStyle: {
    color: 'black',
    fontSize: 15,
  },
  labelStyle: {
    fontSize: 15,
    color: '#565656',
  },
});
