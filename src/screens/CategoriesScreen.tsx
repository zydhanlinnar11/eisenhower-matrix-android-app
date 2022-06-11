import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const CategoriesScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      {/* <View style={styles.container}>
        <Text style={{...styles.text, ...styles.title}}>Categories</Text>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: '100%',
    display: 'flex',
  },
  text: {
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default CategoriesScreen;
