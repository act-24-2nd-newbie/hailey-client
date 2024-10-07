import React,{useState, useEffect, useRef} from 'react';
import '../styles/Task.css';
import axios from 'axios';
import { TaskFieldProps } from '../type/Interface';
import TextField from './TextField'
import { useTask } from '../context/TaskContext';
import btn_remove from '../assets/btn_remove.png';
import TextField from './TextField';

const TaskField = ({ id, contents, isDone:initialIsDone, createdDate, modifiedDate:initialModifiedDate }: TaskFieldProps) => {
  const { setTasks } = useTask();
  const [modifiedDate, setModifiedDate] =useState<Date>(initialModifiedDate);
  const [currentContent, setCurrentContent] = useState<string>(contents);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(initialIsDone);
  const taskFieldRef = useRef<HTMLDivElement | null>(null);

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
    console.log(createdDate);
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

  const handleUpdate = (inputValue: string) => {
    
    console.log("origin : ", contents);
    console.log("update : ", inputValue);
    setModifiedDate(new Date());
    setCurrentContent(inputValue);
    setIsEditing(false);

    axios
      .put(`http://localhost:8080/tasks/${id}`, {contents:inputValue, modifiedDate:modifiedDate, isDone:isDone})
      .then(() => {
        console.log('Book delete successfully.');
      })
      .catch((error) => {
        console.log('Error while adding book:', error);
      });
  }

  const handleDone = () => {
    setModifiedDate(new Date());
    setIsDone(true);
    console.log("isDone");
    axios
      .put(`http://localhost:8080/tasks/${id}`, {contents:currentContent, modifiedDate:modifiedDate, isDone:true})
      .then(() => {
        console.log('Book delete successfully.');
      })
      .catch((error) => {
        console.log('Error while adding book:', error);
      });
  }

  return (
    <div className="task-box" ref={taskFieldRef}>
      {isEditing?  (
        <TextField width={'100%'} inputValue={currentContent} focus={true} onSend={(inputValue)=>handleUpdate(inputValue)}/>
      ):
      (
      <>
        <div className="checkbox-container">
          <input type="checkbox" id={`checkbox-${id}`} className="checkbox" onChange={handleDone} checked={isDone}></input>
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
      </>
    )}
      
    </div>
  );
};

export default TaskField;
