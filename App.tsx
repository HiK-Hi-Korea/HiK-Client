import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/utils/DrawerNavigator';

function App() {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default App;
