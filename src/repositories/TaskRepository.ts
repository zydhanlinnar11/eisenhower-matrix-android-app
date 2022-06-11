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

  private getRefById = async (id: string) => {
    const refs = await firestore()
      .collection('tasks')
      .where('id', '==', id)
      .limit(1)
      .get();

    if (refs.docs.length !== 1) return null;
    return refs.docs[0];
  };

  delete = async (task: Task) => {
    const ref = await this.getRefById(task.id);
    if (!ref) return;
    await firestore().collection('tasks').doc(ref.id).delete();
  };

  update = async (task: Task) => {
    task.due_date = firestore.Timestamp.fromDate(
      new Date(task.due_date),
    ) as any;
    const ref = await this.getRefById(task.id);
    if (!ref) return;
    await firestore().collection('tasks').doc(ref.id).update(task);
  };

  save = async (task: Task) => {
    task.due_date = firestore.Timestamp.fromDate(
      new Date(task.due_date),
    ) as any;
    await firestore().collection('tasks').add(task);
  };
}
