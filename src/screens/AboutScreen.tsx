import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ListItem from '../components/ListItem';
import {useUserDispatch, useUserState} from '../providers/UserProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showErrorToast from '../utils/ShowErrorToast';

const AboutScreen = () => {
  const userState = useUserState();
  const userDispatch = useUserDispatch();

  const logoutHandler = async () => {
    try {
      const url = new URL('https://zydhan.com/auth/logout');
      url.searchParams.append(
        'from',
        'com.zydhan.android.eisenhowermatrix://auth',
      );
      await AsyncStorage.removeItem('@storage_token');
      userDispatch({state: 'unauthenticated'});
      const canOpenUrl = await Linking.canOpenURL(url.toJSON());
      if (!canOpenUrl) {
        showErrorToast();
        return;
      }
      Linking.openURL(url.toJSON());
    } catch (e) {
      ToastAndroid.show('An error occured', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView>
        {userState.state === 'authenticated' ? (
          <>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 24,
              }}>
              {userState.user.avatar_url ? (
                <Image
                  source={{uri: userState.user.avatar_url}}
                  style={{width: 96, height: 96}}
                />
              ) : (
                <Icon
                  name="person-circle-outline"
                  size={96}
                  color={'#fff'}></Icon>
              )}
            </View>
            <ListItem leftText="Name" rightText={userState.user.name} />
            <ListItem leftText="Email" rightText={userState.user.email} />
            <View style={{marginTop: 16}}>
              <CustomButton title="Log out" onPress={logoutHandler} />
            </View>
          </>
        ) : (
          <></>
        )}
        <Text style={styles.text}>About App</Text>
        <ListItem leftText="Application Name" rightText="Eisenhower Matrix" />
        <ListItem leftText="Developer Name" rightText="Zydhan Linnar Putra" />
        <ListItem leftText="Developer NRP" rightText="05111940000118" />
        <ListItem
          leftText="Developer Department"
          rightText="Informatics Eng."
        />
        <ListItem leftText="Technology" rightText="React Native" />
        <ListItem leftText="Programming Language" rightText="TypeScript" />
      </ScrollView>
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
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    marginVertical: 24,
    fontWeight: '500',
  },
});

export default AboutScreen;
