import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ListItem from '../components/ListItem';

const categories = [
  {
    id: 1,
    name: 'Urgent dan penting',
  },
  {
    id: 2,
    name: 'Urgent dan tidak penting',
  },
  {
    id: 3,
    name: 'Tidak urgent dan penting',
  },
  {
    id: 4,
    name: 'Tidak urgent dan tidak penting',
  },
];

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
