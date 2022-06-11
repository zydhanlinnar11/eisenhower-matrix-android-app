import {NavigationProp} from '@react-navigation/native';
import React, {FC} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ListItem from '../components/ListItem';
import categories from '../data/Categories';

const CategoriesScreen: FC<{navigation: NavigationProp<any>}> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      {categories.map(({id, name}) => (
        <ListItem
          title={name}
          key={id}
          onPress={() =>
            navigation.navigate('TasksByCategory', {
              category: {id, name},
            })
          }
        />
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
