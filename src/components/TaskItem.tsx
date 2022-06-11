import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Task from '../types/Task';

type Props = {
  task: Task;
};

const TaskItem: FC<Props> = ({task: {due_date, id, title}}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.textSecondary}>
          {due_date.toLocaleDateString()}
        </Text>
      </View>
      <Icon name="chevron-forward-outline" size={16} color="#fff"></Icon>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 18,
  },
  textSecondary: {
    color: '#9ca3af',
  },
  container: {
    borderBottomColor: 'rgba(255, 255, 255, 0.24)',
    borderBottomWidth: 1,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

export default TaskItem;
