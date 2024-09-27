import React, { createContext, useContext, useState } from 'react';

interface TaskContextType {
  taskCount: number;
  // login: () => void;
  // logout: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [taskCount, setTaskCount] = useState<number>(0);

  const plus = () => setTaskCount(taskCount + 1);
  const minus = () => setTaskCount(taskCount - 1);
  // const login = () => setIsLoggedIn(true);
  // const logout = () => setIsLoggedIn(false);

  return <TaskContext.Provider value={{ taskCount }}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within an TaskProvider');
  }
  return context;
};
