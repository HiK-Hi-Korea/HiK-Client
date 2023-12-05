// import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import StudyLog from '../screens/StudyLog';
import StudyLogInner from '../screens/StudyLogInner';
import StudyOtherFilter from '../screens/StudyOtherFilter';

export default function StudyStackNavigator({navigation: {navigate}, route}) {
  const Stack = createStackNavigator();
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Study Log"
        component={StudyLog}
        options={{headerShown: false}}
        initialParams={{setIsShown: route.params.setIsShown}}
      />
      <Stack.Screen
        name="Conversation"
        component={StudyLogInner}
        options={{headerShown: true}}
        initialParams={{setIsShown: route.params.setIsShown}}
      />
      <Stack.Screen
        name="Others"
        component={StudyOtherFilter}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
