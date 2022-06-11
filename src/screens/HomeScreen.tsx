import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            source={require('../assets/applogo.webp')}
            style={{
              height: 54,
              width: 54,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: 16,
            }}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            Eisenhower Matrix
          </Text>
          <Text
            style={{
              color: '#9ca3af',
              fontSize: 16,
              textAlign: 'center',
              marginTop: 16,
              marginBottom: 16,
            }}>
            Manage your own personal tasks and projects.
          </Text>
          <CustomButton title="Log in" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default HomeScreen;
