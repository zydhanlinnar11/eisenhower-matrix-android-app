import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const CategoriesScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <Text>Categories</Text>
    </SafeAreaView>
  );
};

export default CategoriesScreen;
