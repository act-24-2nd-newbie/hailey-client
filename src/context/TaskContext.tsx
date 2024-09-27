import React, { createContext, useContext, useState } from 'react';
import type { Task } from '../type/Interface';

const preTasks: Task[] = [
  { id: 1, title: 'a' },
  { id: 2, title: 'b' },
  { id: 3, title: 'c' },
];

interface TaskContextType {
  tasks: Task[];
  // taskCount: number;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>; // This is the function to set tasks
  // addTask: (task: Task) => void; // Example for adding a task
  // removeTask: (taskId: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [taskCount, setTaskCount] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[] | []>(preTasks);

  // const plus = () => setTaskCount(taskCount + 1);
  // const minus = () => setTaskCount(taskCount - 1);
  // const login = () => setIsLoggedIn(true);
  // const logout = () => setIsLoggedIn(false);

  return <TaskContext.Provider value={{ tasks, setTasks }}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within an TaskProvider');
  }
  return context;
};
