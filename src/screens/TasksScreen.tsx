import React, {useCallback, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUserState} from '../providers/UserProvider';
import showErrorToast from '../utils/ShowErrorToast';
import {useFocusEffect} from '@react-navigation/native';
import TaskRepository from '../repositories/TaskRepository';
import Task from '../types/Task';
import TaskItem from '../components/TaskItem';

const TasksScreen = () => {
  const userState = useUserState();
  const [tasks, setTasks] = useState<Task[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (userState.state !== 'authenticated') {
        showErrorToast();
        return;
      }
      const {user} = userState;

      const taskRepository = new TaskRepository();
      taskRepository
        .getAllTasksByUserId(user.id)
        .then(tasks => setTasks(tasks))
        .catch(showErrorToast);
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      {tasks.map(task => (
        <TaskItem task={task} key={task.id} />
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

export default TasksScreen;
