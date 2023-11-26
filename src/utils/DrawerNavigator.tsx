import React from 'react';
import Translation from '../screens/Translation';
import {DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer';
import {Image, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import StudyStackNavigator from './StudyStackNavigator';

const Drawer = createDrawerNavigator();
const CustomDrawerContent = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      <SideBarHeader>
        <Image
          style={{height: 45, width: 41}}
          source={require('../assets/img/DrawerLogo.png')}
        />
        <Text style={{marginTop: 25}}>Welcome!</Text>
        <NameText>HiK</NameText>
        <Text>hik@gmail.com</Text>
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

function DrawerNavigator() {
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
      <Drawer.Screen name="StudyLog" component={StudyStackNavigator} />
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
