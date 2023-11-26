// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import StudyLog from '../screens/StudyLog';
import StudyLogInner from '../screens/StudyLogInner';
import StudyOtherFilter from '../screens/StudyOtherFilter';

export default function StudyStackNavigator() {
  const Stack = createStackNavigator();
  return (
    // <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="main" component={StudyLog} />
      <Stack.Screen name="log" component={StudyLogInner} />
      <Stack.Screen name="remake" component={StudyOtherFilter} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
