import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import styled from 'styled-components/native';
import {UserAgeAtom, UserIdAtom, UserNameAtom} from '../assets/recoilValues';
import {useFocusEffect} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Mypage() {
  const [userName, setUserName] = useRecoilState(UserNameAtom);
  const [userAge, setUserAge] = useRecoilState(UserAgeAtom);
  const userIdAtomVal = useRecoilValue(UserIdAtom);

  const [changedName, setChangedName] = React.useState(userName);
  const [changedAge, setChangedAge] = React.useState(userAge);

  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([
    {label: '~ 19', value: 10},
    {label: '20 ~ 29', value: 20},
    {label: '30 ~ 39', value: 30},
    {label: '40 ~ 49', value: 40},
    {label: '50 ~ 59', value: 50},
    {label: '60 ~', value: 60},
  ]);

  const [btnActive, setBtnActive] = React.useState(false);

  const changeUserName = async () => {
    const data = {
      name: changedName,
    };
    try {
      console.log(data);
      const response = await fetch(
        'http://ec2-15-164-210-1.ap-northeast-2.compute.amazonaws.com:8080/user/setName',
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-UserId': userIdAtomVal,
          },
          body: JSON.stringify(data),
        },
      );
      const json = await response.json();
      console.log(json.name);
      setUserName(json.name);
    } catch (error) {
      console.error(error);
    } finally {
      setBtnActive(false);
    }
  };

  const changeUserAge = async () => {
    const data = {
      age: changedAge,
    };
    try {
      console.log(data);
      const response = await fetch(
        'http://ec2-15-164-210-1.ap-northeast-2.compute.amazonaws.com:8080/user/setName',
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-UserId': userIdAtomVal,
          },
          body: JSON.stringify(data),
        },
      );
      const json = await response.json();
      console.log(json.age);
      setUserAge(json.age);
    } catch (error) {
      console.error(error);
    } finally {
      setBtnActive(false);
    }
  };

  const handleOnPressBtn = () => {
    if (btnActive) {
      if (changedName === userName) {
        //age만 바뀌었을 때
        changeUserAge();
      } else {
        if (userAge === changedAge) {
          //name만 바뀌었을 때
          changeUserName;
        } else {
          changeUserName();
          changeUserAge();
        }
      }
    }
  };

  // const handleOnChangePicker = (value: number) => {
  //   setChangedAge(value);
  // };

  useFocusEffect(
    React.useCallback(() => {
      if (changedName !== '' && changedName !== userName) {
        setBtnActive(true);
      } else {
        setBtnActive(false);
      }
    }, [changedName]),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (changedAge !== userAge) {
        setBtnActive(true);
      }
    }, [changedAge]),
  );

  return (
    <Wrapper>
      <TitleBox>
        <Image
          style={{height: 45, width: 41}}
          source={require('../assets/img/DrawerLogo.png')}
        />
        <TextBox>
          <Text style={styles.titleStyle}>Change Your Information</Text>
          <Text style={styles.textStyle}>
            Your Personal information is used to provide a better translation.
          </Text>
        </TextBox>
      </TitleBox>
      <ContentBox>
        <Text style={[styles.labelStyle, {width: 100}]}>UserName</Text>
        <TextInput
          style={styles.filterInputStyle}
          editable
          onChangeText={(val: string) => setChangedName(val)}
          value={changedName}
          placeholder={userName}
        />
      </ContentBox>
      <ContentBox>
        <Text style={[styles.labelStyle, {width: 100}]}>Age</Text>
        <DropDownPicker
          items={items}
          setItems={setItems}
          open={open}
          setOpen={setOpen}
          value={changedAge}
          setValue={setChangedAge}
          autoScroll={true}
          maxHeight={130}
          containerStyle={{width: 180}}
          style={{minHeight: 20, paddingHorizontal: 5}}
        />
      </ContentBox>
      <TouchableOpacity
        style={[
          styles.touchableStyle,
          {
            backgroundColor: btnActive ? '#1556FE' : '#c9c9c9',
          },
        ]}
        onPress={() => {
          handleOnPressBtn;
        }}>
        <Text
          style={{
            color: btnActive ? 'white' : '#797979',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Confirm
        </Text>
      </TouchableOpacity>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const TitleBox = styled.View`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const TextBox = styled.View`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const ContentBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 80%;
  gap: 10px;
  border: 1px solid #1556fe;
  border-radius: 10px;
  padding: 5px;
`;

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterInputStyle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  filterInputInfoStyle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  labelStyle: {
    fontSize: 20,
    color: '#1556FE',
    fontWeight: 'bold',
  },
  textStyle: {
    alignContent: 'flex-start',
    fontSize: 13,
    color: '#565656',
  },
  touchableStyle: {
    marginTop: 150,
    width: 320,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
  },
});
