import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp} from '@react-navigation/native';
import React, {FC, useEffect} from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import {useUserDispatch, useUserState} from '../providers/UserProvider';
import fetchUser from '../utils/FetchUser';
import showErrorToast from '../utils/ShowErrorToast';

const handleLogin = async () => {
  const url = new URL('https://zydhan.com/apps/authorize');
  url.searchParams.append('response_type', 'token');
  url.searchParams.append('app_id', 'b3a87c3f-fc9e-497f-9976-db06813201a7');
  url.searchParams.append(
    'redirect_uri',
    'com.zydhan.android.eisenhowermatrix://auth',
  );
  const canOpenUrl = await Linking.canOpenURL(url.toJSON());
  if (!canOpenUrl) {
    showErrorToast();
    return;
  }
  Linking.openURL(url.toJSON());
};

type Props = {
  route: RouteProp<{params: {token?: string}}, 'params'>;
};

const HomeScreen: FC<Props> = ({route}) => {
  const userState = useUserState();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    const token = route?.params?.token;
    if (!token) return;
    AsyncStorage.setItem('@storage_token', token).catch(showErrorToast);
    fetchUser(token)
      .then()
      .then(user => userDispatch({state: 'authenticated', user}))
      .catch(showErrorToast);
  }, [route?.params?.token]);

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
          <CustomButton onPress={handleLogin} title="Log in" />
          <Text
            style={{
              color: '#9ca3af',
              fontSize: 16,
              textAlign: 'center',
              marginTop: 16,
              marginBottom: 16,
            }}>
            {userState.state === 'authenticated' &&
              JSON.stringify(userState.user)}
          </Text>
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
