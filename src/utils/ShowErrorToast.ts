import {ToastAndroid} from 'react-native';

const showErrorToast = () =>
  ToastAndroid.show('An error occured', ToastAndroid.SHORT);

export default showErrorToast;
