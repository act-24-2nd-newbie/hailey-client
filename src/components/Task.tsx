import React from 'react';
import '../styles/Task.css';
import type { Task } from '../type/Interface';
import { useTask } from '../context/TaskContext';

const Task = () => {
  const { tasks } = useTask();
  return (
    <div className="task-container">
      {tasks.map((task: Task) => (
        <p>
          {task.id} : {task.title}
        </p>
      ))}
    </div>
  );
};

export default Task;
