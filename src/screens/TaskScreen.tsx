import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {
  Alert,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ListItem from '../components/ListItem';
import categories from '../data/Categories';
import Task from '../types/Task';
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import CustomButton from '../components/CustomButton';
import TaskRepository from '../repositories/TaskRepository';
import showErrorToast from '../utils/ShowErrorToast';
import {useUserState} from '../providers/UserProvider';
import uuid from 'react-native-uuid';

type Props = {
  route: RouteProp<
    {params: {task: Task | null; newCategoryId?: number}},
    'params'
  >;
  navigation: NavigationProp<any>;
};

const TaskScreen: FC<Props> = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [date, setDate] = useState(new Date(Date.now()));
  const taskRepository = new TaskRepository();
  const userState = useUserState();

  const createDeleteAlert = () =>
    Alert.alert('Delete', 'Are you sure want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          const task = route?.params?.task;
          if (!task) return;
          taskRepository
            .delete(task)
            .then(() => {
              if (navigation.canGoBack()) navigation.goBack();
            })
            .catch(showErrorToast);
        },
      },
    ]);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) return;
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  useEffect(() => {
    const task = route?.params?.task;
    if (!task) return;
    setName(task.title);
    setCategoryId(task.category_id);
    setDate(new Date(task.due_date));
  }, [route?.params?.task]);

  useEffect(() => {
    const newCategoryId = route?.params?.newCategoryId;
    if (!newCategoryId) return;
    setCategoryId(newCategoryId);
  }, [route?.params?.newCategoryId]);

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleCreate = () => {
    if (userState.state !== 'authenticated') {
      showErrorToast();
      return;
    }
    taskRepository
      .save({
        category_id: categoryId,
        due_date: date.toISOString(),
        id: uuid.v4().toString(),
        title: name,
        user_id: userState.user.id,
      })
      .catch(showErrorToast);
    if (navigation.canGoBack()) navigation.goBack();
  };

  const handleUpdate = () => {
    if (userState.state !== 'authenticated') {
      showErrorToast();
      return;
    }
    const task = route?.params?.task;
    if (!task) return;
    taskRepository
      .update({
        category_id: categoryId,
        due_date: date.toISOString(),
        id: task.id,
        title: name,
        user_id: userState.user.id,
      })
      .catch(e => console.error(e));
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Text style={styles.text}>Name</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={newText => setName(newText)}
        defaultValue={
          route?.params?.task?.title ? route?.params?.task?.title : ''
        }
      />
      <Text style={{...styles.text, marginVertical: 8}}>Category</Text>
      <View>
        <CustomButton
          title={categories.filter(({id}) => id === categoryId)[0].name}
          onPress={() => navigation.navigate('CategorySelect')}
        />
      </View>

      <Text style={{...styles.text, marginVertical: 8}}>Due date</Text>
      <View>
        <CustomButton
          onPress={showDatepicker}
          title={date.toLocaleDateString()}
        />
      </View>

      {route?.params?.task ? (
        <>
          <View style={{marginTop: 36}}>
            <CustomButton title={'Delete'} onPress={createDeleteAlert} />
          </View>
          <View style={{marginTop: 16}}>
            <CustomButton title={'Update'} onPress={handleUpdate} />
          </View>
        </>
      ) : (
        <>
          <View style={{marginTop: 36}}>
            <CustomButton title={'Create'} onPress={handleCreate} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: '100%',
    display: 'flex',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  textInput: {
    height: 40,
    borderWidth: 2,
    borderColor: 'rgba(75, 85, 99, 0.5)',
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'white',
    marginTop: 16,
  },
});

export default TaskScreen;
