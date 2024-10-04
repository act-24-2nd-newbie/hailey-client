import React from 'react';
import '../styles/Task.css';
import axios from 'axios';
import { TaskFieldProps } from '../type/Interface';
import { useTask } from '../context/TaskContext';
import btn_remove from '../assets/btn_remove.png';

const TaskField = ({ id, contents, isDone, createdDate, modifiedDate }: TaskFieldProps) => {
  const { setTasks } = useTask();

  // 날짜 형식 지정: MM/DD
  const formattedDate = (date: Date) => {
    const newDate = new Date(date).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
    });

    const newTime = new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false, // 24시간 형식 사용 (true면 12시간 형식)
    });
    return `${newDate} ${newTime}`;
  };

  const handleDelete = () => {
    console.log('!', id);
    axios
      .delete(`http://localhost:8080/tasks/${id}`)
      .then(() => {
        console.log('Book delete successfully.');
      })
      .catch((error) => {
        console.log('Error while adding book:', error);
      });

    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="task-box">
      <div className="checkbox-container">
        <input type="checkbox" id={`checkbox-${id}`} className="checkbox"></input>
        <label htmlFor={`checkbox-${id}`} className="checkbox-label" />
      </div>

      <p className="content"> {contents} </p>

      {formattedDate(createdDate) === formattedDate(modifiedDate) ? (
        <p className="date">Created: {formattedDate(createdDate)}</p>
      ) : (
        <p className="date">
          Created: {formattedDate(createdDate)} (Modified: {formattedDate(modifiedDate)} )
        </p>
      )}

      <div className="image-container" onClick={() => handleDelete()}>
        <img src={btn_remove} alt="Remove Button" className="remove" />
      </div>
    </div>
  );
};

export default TaskField;
