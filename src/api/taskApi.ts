// taskApi.ts
import axios from 'axios';
import type { Task } from '../type/Interface';

const API_URL = 'http://localhost:8080/tasks';

export const fetchTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const createTask = async (task: Task) => {
  const response = await axios.post(`${API_URL}/tasks`, { task });
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  await axios.delete(`${API_URL}/tasks/${taskId}`);
};

export const searchTask = async (taskId: number) => {
  const response = await axios.get(`${API_URL}/tasks/${taskId}`);
  console.log('response for search : ', response.data);
  return response.data;
};
