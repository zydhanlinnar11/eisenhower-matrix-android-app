import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import {Text} from 'react-native';
import {UserProvider} from './src/providers/UserProvider';

const Stack = createNativeStackNavigator();

const config = {
  screens: {
    Home: {
      path: 'auth',
    },
  },
};

const linking = {
  prefixes: ['com.zydhan.android.eisenhowermatrix://'],
  config,
};

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};
export default App;
