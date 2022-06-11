import React from 'react';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text} from 'react-native';
import CategoriesScreen from './CategoriesScreen';
import HomeScreen from './HomeScreen';
import {useUserState} from '../providers/UserProvider';

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

const privateScreen = (
  <>
    <Stack.Screen
      name="Categories"
      component={CategoriesScreen}
      options={{headerShown: false}}
    />
  </>
);

const publicScreen = (
  <>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
  </>
);

const Navigation = () => {
  const {state} = useUserState();

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator>
        {state === 'authenticated' ? privateScreen : publicScreen}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
