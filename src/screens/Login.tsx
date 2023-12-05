import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSetRecoilState} from 'recoil';
import styled from 'styled-components/native';
import {
  IsUserAtom,
  UserEmailAtom,
  UserIdAtom,
  UserNameAtom,
} from '../assets/recoilValues';

export default function Login() {
  const setUserName = useSetRecoilState(UserNameAtom);
  const setUserEmail = useSetRecoilState(UserEmailAtom);
  const setUserId = useSetRecoilState(UserIdAtom);
  const setIsUser = useSetRecoilState(IsUserAtom);
  const userLogin = async () => {
    try {
      const response = await fetch(
        'http://ec2-15-164-210-1.ap-northeast-2.compute.amazonaws.com:8080/login/oauth2/request/google',
        {
          method: 'GET',
        },
      );
      const json = await response.json();
      console.log(json);
      setIsUser(true);
      setUserId(json.id);
      if (json.name === null) {
        setUserName('HiK-user');
      } else {
        setUserName(json.name);
      }
      setUserEmail(json.email);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Wrapper>
      <TextFlexStart>
        <Text style={styles.titleStyle}>Sign-Up and Enjoy!</Text>
        <Text style={styles.textStyle}>
          You can save your korean conversation for your Korean Achievement
        </Text>
      </TextFlexStart>
      <TouchableOpacityWrapper>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => {
            userLogin;
          }}>
          <Text style={styles.btnTextStyle}>Login with Google</Text>
        </TouchableOpacity>
      </TouchableOpacityWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
`;

const TextFlexStart = styled.View`
  display: flex;
  width: 90%;
  margin-top: 70px;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
`;

const TouchableOpacityWrapper = styled.View`
  display: flex;
  width: 90%;
`;

const styles = StyleSheet.create({
  touchableStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
    width: 340,
    // width: '100%',
    backgroundColor: '#EA4335',
  },
  textStyle: {
    fontSize: 18,
    color: 'black',
  },
  titleStyle: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  btnTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
