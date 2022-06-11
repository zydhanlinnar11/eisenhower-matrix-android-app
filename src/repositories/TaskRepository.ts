import firestore from '@react-native-firebase/firestore';
import Task from '../types/Task';

export default class TaskRepository {
  getAllTasksByUserId = async (userId: string) => {
    const tasksRef = await firestore()
      .collection('tasks')
      .where('user_id', '==', userId)
      .orderBy('due_date', 'desc')
      .get();
    const tasks = tasksRef.docs.map(task => task.data() as Task);
    return tasks;
  };

  getAllTasksByUserIdAndCategoryId = async (
    userId: string,
    categoryId: number,
  ) => {
    const tasksRef = await firestore()
      .collection('tasks')
      .where('user_id', '==', userId)
      .where('category_id', '==', categoryId)
      .orderBy('due_date', 'desc')
      .get();
    const tasks = tasksRef.docs.map(task => task.data() as Task);
    return tasks;
  };
}
