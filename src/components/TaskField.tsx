import React, {useState} from 'react';
import '../styles/Task.css';
import axios from 'axios';
import { TaskFieldProps } from '../type/Interface';
import { useTask } from '../context/TaskContext';
import btn_remove from '../assets/btn_remove.png';
import TextField from './TextField';

const TaskField = ({ id, contents, isDone, createdDate, modifiedDate }: TaskFieldProps) => {
  const { setTasks } = useTask();
  const [isEditing, setIsEditing] = useState<boolean>(false);

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

  const handleTaskFieldClick = () => {
    setIsEditing(true);

    if (isDone) console.log('done');
    else console.log('not complete');
    axios
      .put(`http://localhost:8080/tasks/${id}`, { isDone: true, contents: contents })
      .then(() => {
        console.log('Book delete successfully.');
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, is_done: true } : task)));
      })
      .catch((error) => {
        console.log('Error while adding book:', error);
      });
  };

  const handleSend = (value: string) => {
    // setTaskContent(value); // 내용 업데이트
    if(value!==null){
      axios
      .put(`http://localhost:8080/tasks/${id}`, { isDone: false, contents: value }) // 요청 시 내용 전송
      .then(() => {
        setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, contents: value } : task)));
      })
      .catch((error) => {
        console.log('Error while updating task:', error);
      });
    } 
    setIsEditing(false); // 편집 완료 후 상태 변경
    
  };


  return (
    <div className="task-box" onClick={handleTaskFieldClick}>
      <div className="checkbox-container">
        <input type="checkbox" id={`checkbox-${id}`} className="checkbox"></input>
        <label htmlFor={`checkbox-${id}`} className="checkbox-label" />
      </div>

      {isEditing ? ( // 편집 모드일 경우 TextField 렌더링
        <TextField
          borderVisible
          placeholder="Edit task..."
          onSend={handleSend}
          width={0}
          top={0}
          left={0}
        />
      ) : (
        <p className="content">{contents}</p>
      )}

      

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
