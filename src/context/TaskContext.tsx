import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Task } from '../type/Interface';
import axios from 'axios';

interface TaskContextType {
  sortOrder: string;
  tasks: Task[];
  // sortedTasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>; // This is the function to set tasks
  // setSortedTasks: React.Dispatch<React.SetStateAction<Task[]>>; // This is the function to set tasks
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[] | []>([]);
  // const [sortedTasks, setSortedTasks] = useState<Task[] | []>(preTasks);
  const [sortOrder, setSortOrder] = useState<string>('oldest');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tasks'); // 서버 API 엔드포인트
      // console.log(response.data[0].modifiedDate);

      const formattedTasks: Task[] = response.data.map((task: Task) => ({
        id: task.id,
        contents: task.contents,
        is_done: task.done, // 'done'을 'is_done'으로 변환
        created_date: task.createDate, // 날짜 문자열
        modified_date: task.modifiedDate, // 날짜 문자열
      }));

      // 상태 업데이트
      setTasks(formattedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); // 컴포넌트가 마운트될 때 초기 데이터 가져오기
  }, []);

  return <TaskContext.Provider value={{ tasks, setTasks, sortOrder, setSortOrder }}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within an TaskProvider');
  }
  return context;
};
