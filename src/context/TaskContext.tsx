import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Task } from '../type/Interface';

const preTasks: Task[] = [
  // { id: 1, contents: 'a', is_done: true, modified_date: new Date(), created_date: new Date() },
  // { id: 2, contents: 'b', is_done: true, modified_date: new Date(), created_date: new Date() },
  // { id: 3, contents: 'c', is_done: true, modified_date: new Date(), created_date: new Date() },
];

interface TaskContextType {
  sortOrder: string;
  tasks: Task[];
  sortedTasks: Task[];
  // taskCount: number;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>; // This is the function to set tasks
  setSortedTasks: React.Dispatch<React.SetStateAction<Task[]>>; // This is the function to set tasks
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  // addTask: (task: Task) => void; // Example for adding a task
  // removeTask: (taskId: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [taskCount, setTaskCount] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[] | []>(preTasks);
  const [sortedTasks, setSortedTasks] = useState<Task[] | []>(preTasks);
  const [sortOrder, setSortOrder] = useState<string>('oldest');

  // useEffect(() => {
  //   const sorted = [...tasks].sort((a, b) => {
  //     if (sortOrder === 'oldest') {
  //       return new Date(a.created_date).getTime() - new Date(b.created_date).getTime();
  //     } else {
  //       return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
  //     }
  //   });
  //   setSortedTasks(sorted);
  // }, [tasks, sortOrder]);

  // const plus = () => setTaskCount(taskCount + 1);
  // const minus = () => setTaskCount(taskCount - 1);
  // const login = () => setIsLoggedIn(true);
  // const logout = () => setIsLoggedIn(true);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, sortedTasks, setSortedTasks, sortOrder, setSortOrder }}>
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
