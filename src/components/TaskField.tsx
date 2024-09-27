import React from 'react';
import '../styles/Task.css';
import { TaskFieldProps } from '../type/Interface';
import btn_remove from '../assets/btn_remove.png';

const TaskField = ({ id, contents, date }: TaskFieldProps) => {
  return (
    <div className="task-box">
      <input type="checkbox" className="checkbox" />
      <p className="content"> {contents} </p>
      <p className="date"> Created : {date.toLocaleString()} </p>
      <div className="image-container">
        <img src="btn_remove.png" alt="Remove Button" className="remove" />
      </div>
    </div>
  );
};

export default TaskField;
