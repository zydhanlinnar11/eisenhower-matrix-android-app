import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ListItem from '../components/ListItem';
import categories from '../data/Categories';

const CategoriesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      {categories.map(({id, name}) => (
        <ListItem title={name} key={id} />
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: '100%',
    display: 'flex',
    paddingHorizontal: 16,
  },
});

export default CategoriesScreen;
