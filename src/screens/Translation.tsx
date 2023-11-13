import React from 'react';
import {Alert, SafeAreaView, Text} from 'react-native';
import styled from 'styled-components/native';
import GenerateButton from '../utils/GenerateButton';
import SuccessButton from '../utils/SuccessButton';
// import FilterBtn from '../utils/FilterBtn';
import DropDownPicker from 'react-native-dropdown-picker';
import {ActiveVoiceBtn, UnactiveVoiceBtn} from '../utils/VoiceTextBtn';
import Sound from 'react-native-sound';
import {PlaySoundBtn} from '../utils/PlaySoundBtn';
import Voice from '@react-native-voice/voice';
import Clipboard from '@react-native-clipboard/clipboard';
import {CopyBtn} from '../utils/CopyBtn';
import { useRecoilValue } from 'recoil';
import { LocationTypeAtom } from '../assets/recoilValues';

// var Sound = require('react-native-sound');
// Sound.setCategory('Playback');

export default function Translation() {
  const [text, onChangeText] = React.useState('');
  const [pressed, setPressed] = React.useState(false);
  const [translation, setTranslation] = React.useState('');
  const [voiceBtnPressed, setVoiceBtnPressed] = React.useState(false);
  const [playUrl, setPlayUrl] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    {label: 'Student', value: 'student'},
    {label: 'Professor', value: 'professor'},
    {label: 'Elder', value: 'elder'},
    {label: 'Child', value: 'child'},
    {label: 'Others', value: 'others'},
  ]);
  const location = useRecoilValue(LocationTypeAtom);

  React.useEffect(() => {
    setPressed(false);
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

  const getTranslation = async (text: string, filter: string) => {
    const data = {
      sourceSentence: text,
      place: location,
      listener: filter,
      intimacy: 1,
    };
    try {
      const response = await fetch('http://13.125.89.24:8080/trans', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      // console.log(data);
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
    } else if (value === null) {
      Alert.alert('please select filter');
    } else {
      getTranslation(text, value);
    }
  };

  // const copyToClipboard = (clipboradText: string) => {
  //   Clipboard.setString(clipboradText);
  //   console.log('copied!');
  // };

  const handleSoundPlayBtn = () => {
    if (text === '' || value === null) {
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
            <LocationText>Your Location Is... {location}</LocationText>
          </LocationBox>
          <FilterContour>
            <Text style={{color: 'white'}}>Talk with</Text>
          </FilterContour>
          <DropDownPicker
            containerStyle={{width: '85%', borderBlockColor: 'transparent'}}
            maxHeight={100}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
          <FilterContour>
            <Text style={{color: 'white'}}>Intimacy</Text>
          </FilterContour>
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
  width: 100%;
  height: 100%;
`;

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
  },
}))``;

const LocationBox = styled.View`
  display: flex;
  flex-direction: row;
  width: 85%;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 20px;
`;

const LocationText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const FilterContour = styled.View`
  display: flex;
  justify-content: center;
  width: 85%;
  height: 30px;
  background-color: rgba(21, 86, 254, 1);
  border-radius: 20px;
  padding: 5px 0px 5px 10px;
  margin-top: 10px;
  margin-bottom: 5px;
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
  width: 85%;
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
  width: 85%;
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
