import React, {FC, useCallback, useLayoutEffect, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUserState} from '../providers/UserProvider';
import showErrorToast from '../utils/ShowErrorToast';
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import TaskRepository from '../repositories/TaskRepository';
import Task from '../types/Task';
import TaskItem from '../components/TaskItem';
import Category from '../types/Category';

type Props = {
  route: RouteProp<{params: {category: Category}}, 'params'>;
  navigation: NavigationProp<any>;
};

const TasksByCategoryScreen: FC<Props> = ({navigation, route}) => {
  const userState = useUserState();
  const [tasks, setTasks] = useState<Task[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({title: route.params.category.name});
  }, [route.params.category]);

  useFocusEffect(
    useCallback(() => {
      if (userState.state !== 'authenticated') {
        showErrorToast();
        return;
      }
      const {user} = userState;

      const taskRepository = new TaskRepository();
      taskRepository
        .getByUserIdAndCategoryId(user.id, route.params.category.id)
        .then(tasks => setTasks(tasks))
        .catch(showErrorToast);
    }, [route.params.category]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      {tasks.map(task => (
        <TaskItem task={task} key={task.id} navigation={navigation} />
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

export default TasksByCategoryScreen;
