import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Task } from '../type/Interface';
import axios from 'axios';

interface TaskContextType {
  sortOrder: string;
  tasks: Task[];
  countTasks: number;
  countDoneTasks: number;

  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  setCountTasks: React.Dispatch<React.SetStateAction<number>>;
  setCountDoneTasks: React.Dispatch<React.SetStateAction<number>>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[] | []>([]);
  const [countTasks, setCountTasks] = useState<number>(0);
  const [countDoneTasks, setCountDoneTasks] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('Oldest');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tasks');
      const formattedTasks: Task[] = response.data.map((task: Task) => ({
        id: task.id,
        contents: task.contents,
        isDone: task.isDone,
        createdDate: task.createdDate,
        modifiedDate: task.modifiedDate,
      }));

      setTasks(formattedTasks);
      setCountTasks(formattedTasks.length);

      const doneTasksCount = formattedTasks.filter((task) => task.isDone).length;
      setCountDoneTasks(doneTasksCount);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, sortOrder, setSortOrder, countTasks, setCountTasks, countDoneTasks, setCountDoneTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within an TaskProvider');
  }
  return context;
};
