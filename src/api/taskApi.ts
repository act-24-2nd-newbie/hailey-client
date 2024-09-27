// taskApi.ts
import axios from 'axios';
import type { Task } from '../type/Interface';

const API_URL = 'your-api-url';

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
