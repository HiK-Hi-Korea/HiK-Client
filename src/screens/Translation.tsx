import React from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import GenerateButton from '../utils/GenerateButton';
import SuccessButton from '../utils/SuccessButton';
// import FilterBtn from '../utils/FilterBtn';
import {ActiveVoiceBtn, UnactiveVoiceBtn} from '../utils/VoiceTextBtn';
import Sound from 'react-native-sound';
import {PlaySoundBtn} from '../utils/PlaySoundBtn';
import Voice from '@react-native-voice/voice';
import Clipboard from '@react-native-clipboard/clipboard';
import {CopyBtn} from '../utils/CopyBtn';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  IntimacyFilterAtom,
  LocationTypeAtom,
  PersonFilterAtom,
  UserIdAtom,
} from '../assets/recoilValues';
import FilterBtn, {personFilterType} from '../utils/FilterBtn';
import IntimacyBtn from '../utils/IntimacyBtn';
import {OnlineFilter, StoreFilter, UnivFilter} from '../assets/filterValues';
import {useFocusEffect} from '@react-navigation/native';

// var Sound = require('react-native-sound');
// Sound.setCategory('Playback');

export default function Translation({navigation: {navigate}}) {
  const [text, onChangeText] = React.useState('');
  const [filterChanged, setFilterChanged] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState<
    string | undefined
  >();
  const [pressed, setPressed] = React.useState(false);
  const [translation, setTranslation] = React.useState('');
  const [voiceBtnPressed, setVoiceBtnPressed] = React.useState(false);
  const [playUrl, setPlayUrl] = React.useState('');

  const [items, setItems] = React.useState<personFilterType[]>();
  const location = useRecoilValue(LocationTypeAtom);
  const [person, setPerson] = useRecoilState(PersonFilterAtom);
  const intimacyAtomVal = useRecoilValue(IntimacyFilterAtom);
  const userIdAtomVal = useRecoilValue(UserIdAtom);

  useFocusEffect(
    React.useCallback(() => {
      if (location === 'university') {
        setItems(UnivFilter);
      } else if (location === 'store') {
        setItems(StoreFilter);
      } else {
        setItems(OnlineFilter);
      }
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (selectedFilter !== undefined && selectedFilter !== '') {
        setPerson(selectedFilter);
      }
      console.log(selectedFilter);
      if (pressed) {
        setPressed(false);
      }
    }, [selectedFilter]),
  );

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log('if filter changed? text changed? filter useEffect');
  //     if (pressed) {
  //       setPressed(false);
  //     }
  //   }, [filterChanged, text]),
  // );

  React.useEffect(() => {
    if (pressed) {
      setPressed(false);
    }
  }, [text]);

  const _onSpeechStart = () => {
    console.log('onSpeechStart');
    onChangeText('');
  };
  const _onSpeechEnd = () => {
    console.log('onSpeechEnd');
  };
  const _onSpeechResults = (event: any) => {
    console.log('onSpeechResults');
    onChangeText(event.value[0]);
  };
  const _onSpeechError = (event: any) => {
    console.log('_onSpeechError');
    console.log(event.error);
  };

  const _onRecordVoice = () => {
    if (voiceBtnPressed) {
      Voice.stop();
    } else {
      Voice.start('en-US');
    }
    setVoiceBtnPressed(!voiceBtnPressed);
  };

  React.useEffect(() => {
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const getTranslation = async (text: string) => {
    const data = {
      sourceSentence: text,
      place: location,
      listener: person,
      intimacy: intimacyAtomVal,
    };
    try {
      console.log(data);
      const response = await fetch(
        'http://ec2-15-164-210-1.ap-northeast-2.compute.amazonaws.com:8080/trans',
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
      setTranslation(json.translatedSentence);
      setPlayUrl(json.voiceFile);
      // setPlayUrl(
      //   'https://hik-s3-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%80%E1%85%A1%E1%84%8B%E1%85%AD%3F.mp3',
      // );
    } catch (error) {
      console.error(error);
    } finally {
      setPressed(true);
    }
  };

  const handleButtonClicked = () => {
    if (text === '') {
      Alert.alert('please enter text');
    } else {
      getTranslation(text);
    }
  };

  // const copyToClipboard = (clipboradText: string) => {
  //   Clipboard.setString(clipboradText);
  //   console.log('copied!');
  // };

  const handleSoundPlayBtn = () => {
    if (text === '') {
      Alert.alert('Please translate your text first');
    } else {
      Sound.setCategory('Playback');
      var mySound = new Sound(playUrl, undefined, error => {
        if (error) {
          console.log('Error loading sound', error);
          return;
        }
        if (mySound.isLoaded()) {
          mySound.setVolume(1);
          mySound.play(success => {
            if (success) {
              console.log('Sound playing');
            } else {
              console.log('Issue playing file');
            }
            mySound.release();
          });
        } else {
          console.log('Sound is not loaded.');
        }
      });
    }
  };

  return (
    <SafeAreaView>
      <ViewContent>
        <Container>
          <LocationBox>
            <Text style={styles.titleStyle}>Your Location Is...</Text>
            <TouchableOpacity onPress={() => navigate('Map')}>
              <Text style={styles.towardMapStyle}>{location}</Text>
            </TouchableOpacity>
          </LocationBox>
          <FilterContour>
            <Text style={styles.contourStyle}>Talk with</Text>
          </FilterContour>
          <FilterWrapper>
            <Text style={styles.filterInputInfoStyle}>Your Filter : </Text>
            <FilterInput>
              <TextInput
                style={styles.filterInputStyle}
                editable
                onChangeText={(val: string) => setSelectedFilter(val)}
                value={selectedFilter}
                placeholder="input text or select"
              />
            </FilterInput>
          </FilterWrapper>
          <FilterWrapper>
            {items && (
              <FilterBtn
                getFilter={items}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                setFilterChanged={setFilterChanged}
              />
            )}
          </FilterWrapper>
          <FilterContour>
            <Text style={styles.contourStyle}>Intimacy</Text>
          </FilterContour>
          <FilterWrapper>
            <IntimacyBtn
              setPressed={setPressed}
              setFilterChanged={setFilterChanged}
            />
          </FilterWrapper>
          <InputBoxWrapper>
            <InputBox>
              <InputText
                editable
                multiline
                numberOfLines={3}
                onChangeText={(val: string) => onChangeText(val)}
                value={text}
                placeholder={'Input Your Text'}
              />
              <UtilBox>
                {/* <CopyBtn onPress={() => copyToClipboard(text)} /> */}
                <CopyBtn onPress={() => Clipboard.setString(text)} />
                {voiceBtnPressed === true ? (
                  <ActiveVoiceBtn
                    // source="Microphone_blue.png"
                    // onPress={() => handleVoiceBtn}
                    onPress={() => _onRecordVoice}
                  />
                ) : (
                  <UnactiveVoiceBtn
                    // source="Microphone.png"
                    // onPress={() => handleVoiceBtn}
                    onPress={() => _onRecordVoice}
                  />
                )}
              </UtilBox>
            </InputBox>
          </InputBoxWrapper>
          {pressed === true && translation !== '' ? (
            <SuccessButton title="Success!" />
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
          <ResultBox>
            <GeneratedText>{translation}</GeneratedText>
            <UtilBox>
              {/* <CopyBtn onPress={() => copyToClipboard(translation)} /> */}
              <CopyBtn onPress={() => Clipboard.setString(translation)} />
              <PlaySoundBtn onPress={() => handleSoundPlayBtn} />
            </UtilBox>
          </ResultBox>
        </Container>
      </ViewContent>
    </SafeAreaView>
  );
}

const ViewContent = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
  },
}))`
  width: 90%;
`;

const LocationBox = styled.View`
  display: flex;
  flex-direction: row;
  width: 98%;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const FilterContour = styled.View`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 30px;
  background-color: rgba(21, 86, 254, 1);
  border-radius: 20px;
  padding: 5px 0px 5px 10px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const FilterInput = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 70%;
  height: 30px;
  border: 1px solid rgba(21, 86, 254, 1);
  /* background-color: rgba(21, 86, 254, 1); */
  border-radius: 20px;
  padding: 0px 0px 0px 10px;
  margin-top: 5px;
  gap: 5px;
  /* margin-bottom: 5px; */
`;

const FilterWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 98%;
  align-items: center;
  justify-content: flex-start;
`;

const InputBoxWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputBox = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 160px;
  border-radius: 8px;
  /* border: 1px solid black; */
  margin-top: 15px;
  padding: 10px;
  background-color: whitesmoke;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.1);
`;

const UtilBox = styled.View`
  display: flex;
  gap: 10px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const InputText = styled.TextInput`
  display: flex;
  width: 100%;
  height: 80%;
  /* background-color: green; */
  border-radius: 10px 10px 0 0;
`;

const ResultBox = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 160px;
  border-radius: 8px;
  /* border: 1px solid black; */
  margin-top: 15px;
  padding: 10px;
  background-color: whitesmoke;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.1);
`;

const GeneratedText = styled.Text`
  display: flex;
  height: 80%;
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
  filterInputStyle: {
    fontSize: 18,
    color: '#1556FE',
    fontWeight: 'bold',
  },
  filterInputInfoStyle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  towardMapStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1556FE',
    textDecorationLine: 'underline',
    textDecorationColor: '#1556FE',
  },
  contourStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  filterTitleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FE3A5D',
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
