import firestore from '@react-native-firebase/firestore';
import Task from '../types/Task';

export default class TaskRepository {
  getAllTasksByUserId = async (userId: string) => {
    const tasksRef = await firestore()
      .collection('tasks')
      .where('user_id', '==', userId)
      .orderBy('due_date', 'desc')
      .get();
    const tasks = tasksRef.docs.map(task => this.convertToTask(task.data()));
    return tasks;
  };

  getByUserIdAndCategoryId = async (userId: string, categoryId: number) => {
    const tasksRef = await firestore()
      .collection('tasks')
      .where('user_id', '==', userId)
      .where('category_id', '==', categoryId)
      .orderBy('due_date', 'desc')
      .get();
    const tasks = tasksRef.docs.map(task => this.convertToTask(task.data()));
    return tasks;
  };

  private convertToTask = (taskDoc: any) => {
    const task: Task = taskDoc;
    const second: number = (task.due_date as any).seconds;
    const date = new Date(0);
    date.setUTCSeconds(second);
    task.due_date = date.toISOString();

    return task;
  };
}
