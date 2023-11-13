import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/utils/DrawerNavigator';
import {Map} from './src/screens/Map';
import {createStackNavigator} from '@react-navigation/stack';
import { RecoilRoot } from 'recoil';
import LocationSelection from './src/screens/LocationSelection';

const Stack = createStackNavigator();

function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Selection" component={LocationSelection} />
          <Stack.Screen name="Home" component={DrawerNavigator} />
        </Stack.Navigator>
        {/* <DrawerNavigator /> */}
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
