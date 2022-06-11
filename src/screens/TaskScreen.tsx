import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {FC} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ListItem from '../components/ListItem';
import Task from '../types/Task';

type Props = {
  route: RouteProp<{params: {task: Task}}, 'params'>;
  navigation: NavigationProp<any>;
};

const TaskScreen: FC<Props> = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <ListItem leftText="Name" rightText={route.params.task.title} />
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

export default TaskScreen;
