import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Button, Text, View} from 'react-native';
import CategoriesScreen from './CategoriesScreen';
import HomeScreen from './HomeScreen';
import {useUserState} from '../providers/UserProvider';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

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

const privateScreenWithTabsOption = {
  headerStyle: {
    backgroundColor: '#000',
  },
  headerTitleStyle: {
    color: '#fff',
  },
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PrivateScreenWithTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#000',
      },
    })}>
    <Tab.Screen
      name="Categories"
      component={CategoriesScreen}
      options={{
        ...privateScreenWithTabsOption,
        tabBarIcon: ({focused, color, size}) => (
          <Icon name="list-outline" size={size} color={color}></Icon>
        ),
      }}
    />
  </Tab.Navigator>
);

const Navigation = () => {
  const {state} = useUserState();

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator>
        {state === 'authenticated' ? (
          <Stack.Screen
            name="PrivateScreenWithTabs"
            component={PrivateScreenWithTabs}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;