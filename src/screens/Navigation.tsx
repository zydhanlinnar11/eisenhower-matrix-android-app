import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';
import CategoriesScreen from './CategoriesScreen';
import HomeScreen from './HomeScreen';
import {useUserState} from '../providers/UserProvider';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import AboutScreen from './AboutScreen';
import TasksScreen from './TasksScreen';
import TasksByCategoryScreen from './TasksByCategoryScreen';
import TaskScreen from './TaskScreen';

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
    <Tab.Screen
      name="Tasks"
      component={TasksScreen}
      options={{
        ...privateScreenWithTabsOption,
        tabBarIcon: ({focused, color, size}) => (
          <Icon
            name="checkmark-circle-outline"
            size={size}
            color={color}></Icon>
        ),
      }}
    />
    <Tab.Screen
      name="About"
      component={AboutScreen}
      options={{
        ...privateScreenWithTabsOption,
        tabBarIcon: ({focused, color, size}) => (
          <Icon name="person-outline" size={size} color={color}></Icon>
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
          <>
            <Stack.Screen
              name="PrivateScreenWithTabs"
              component={PrivateScreenWithTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TasksByCategory"
              component={TasksByCategoryScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#000',
                },
                headerTintColor: 'white',
              }}
            />
            <Stack.Screen
              name="Task"
              component={TaskScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#000',
                },
                headerTintColor: 'white',
              }}
            />
          </>
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
