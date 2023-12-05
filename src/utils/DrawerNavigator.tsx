import React from 'react';
import Translation from '../screens/Translation';
import {DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer';
import {Image, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import StudyStackNavigator from './StudyStackNavigator';
import {useRecoilValue} from 'recoil';
import {IsUserAtom, UserEmailAtom, UserNameAtom} from '../assets/recoilValues';
import Login from '../screens/Login';
import Mypage from '../screens/Mypage';

const Drawer = createDrawerNavigator();
const CustomDrawerContent = props => {
  const isUser = useRecoilValue(IsUserAtom);
  const userName = useRecoilValue(UserNameAtom);
  const userEmail = useRecoilValue(UserEmailAtom);
  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      <SideBarHeader>
        <Image
          style={{height: 45, width: 41}}
          source={require('../assets/img/DrawerLogo.png')}
        />
        {isUser ? (
          <>
            <Text style={{marginTop: 25}}>Welcome!</Text>
            <NameText>{userName}</NameText>
            <Text>{userEmail}</Text>
          </>
        ) : (
          <>
            <Text style={{marginTop: 25}}>You are in</Text>
            <NameText>GuestMode</NameText>
            <Text>please Login First!</Text>
          </>
        )}
      </SideBarHeader>
      <DrawerItemList {...props} />
    </SafeAreaView>
  );
};

function HeaderImg() {
  return (
    <Image
      style={{height: 35, width: 32}}
      source={require('../assets/img/BasicLogo.png')}
    />
  );
}

function DrawerNavigator({navigation: {navigate}}) {
  const [isShown, setIsShown] = React.useState(true);
  const isUser = useRecoilValue(IsUserAtom);
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
          height: 100,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: () => HeaderImg(),
      }}>
      <Drawer.Screen name="Translation" component={Translation} />
      <Drawer.Screen
        name="Study"
        component={StudyStackNavigator}
        initialParams={{setIsShown: setIsShown}}
        options={{headerShown: isShown}}
      />
      {isUser ? (
        <Drawer.Screen name="My Page" component={Mypage} />
      ) : (
        <Drawer.Screen name="Login" component={Login} />
      )}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

const SideBarHeader = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 25%;
  padding-left: 20px;
  /* background-color: rgba(254, 58, 93, 1); */
`;

const NameText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;
