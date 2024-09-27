// useTasks.ts
import { useEffect, useState } from 'react';
import { fetchTasks, createTask, deleteTask } from '../api/taskApi';
import type { Task } from '../type/Interface';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
      setLoading(false);
    };
    loadTasks();
  }, []);

  const addTask = async (title: string) => {
    console.log('addTask : ', title);
    // await createTask(task);
    // Optionally, refresh tasks after adding
  };

  const removeTask = async (taskId: string) => {
    console.log('removeTask: ', taskId);
    // await deleteTask(taskId);
    // Optionally, refresh tasks after deleting
  };

  return { tasks, loading, addTask, removeTask };
};
