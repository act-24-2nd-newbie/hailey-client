import React, { useState, useEffect, useRef } from 'react';
import '../styles/TaskField.css';
import axios from 'axios';
import { TaskFieldProps } from '../type/Interface';
import TextField from './TextField';
import { useTask } from '../context/TaskContext';
import btn_remove from '../assets/btn_remove.png';

const TaskField = ({
  id,
  contents,
  isDone: initialIsDone,
  createdDate,
  modifiedDate: initialModifiedDate,
}: TaskFieldProps) => {
  const { setTasks } = useTask();
  // const createdDate = initialCreatedDate;
  const [modifiedDate, setModifiedDate] = useState<string>(initialModifiedDate);
  const [currentContent, setCurrentContent] = useState<string>(contents);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(initialIsDone);
  const taskFieldRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    console.log(initialIsDone);
  }, [initialIsDone]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (taskFieldRef.current && !taskFieldRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  // 날짜 형식 지정: MM/DD
  const formattedDate = (date: string) => {
    console.log('Date : ', date);

    const newDate = new Date(date).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
    });

    const newTime = new Date(date).toLocaleTimeString('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false, // 24시간 형식 사용 (true면 12시간 형식)
    });
    console.log('newDate : ', newDate);
    console.log('newTime : ', newTime);
    return `${newDate} ${newTime}`;
  };

  const handleDelete = () => {
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

  const handleUpdate = (inputValue: string) => {
    setCurrentContent(inputValue);
    setIsEditing(false);

    axios
      .put(`http://localhost:8080/tasks/${id}`, { contents: inputValue, modifiedDate: modifiedDate, isDone: isDone })
      .then((response) => {
        setModifiedDate(response.data.modifiedDate);
        console.log('Book delete successfully.');
      })
      .catch((error) => {
        console.log('Error while adding book:', error);
      });
  };

  const handleDone = () => {
    setIsDone(!isDone);
    setIsEditing(false);
    axios
      .put(`http://localhost:8080/tasks/${id}`, { contents: currentContent, isDone: !isDone })
      .then((response) => {
        setModifiedDate(response.data.modifiedDate);
        console.log('done');
      })
      .catch((error) => {
        console.log('Error while adding book:', error);
      });
  };

  return (
    <div className="task-box" ref={taskFieldRef}>
      {isEditing && !isDone ? (
        <TextField
          style={{ width: '100%', paddingLeft: '15px', paddingRight: '15px' }}
          inputValue={currentContent}
          focus={true}
          onSend={(inputValue) => handleUpdate(inputValue)}
        />
      ) : (
        <>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id={`checkbox-${id}`}
              className="checkbox"
              onChange={handleDone}
              checked={isDone}
            ></input>
            <label htmlFor={`checkbox-${id}`} className="checkbox-label" />
          </div>

          <p
            className="content"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            {' '}
            {currentContent}{' '}
          </p>
          {/* {console.log(createdDate)}
          {console.log(modifiedDate)} */}
          {createdDate === modifiedDate ? (
            <p className="date">{formattedDate(createdDate)}</p>
          ) : (
            <p className="date">
              {formattedDate(createdDate)} (Modified: {formattedDate(modifiedDate)} )
            </p>
          )}

          <div className="image-container" onClick={() => handleDelete()}>
            <img src={btn_remove} alt="Remove Button" className="remove" />
          </div>
        </>
      )}
    </div>
  );
};

export default TaskField;
