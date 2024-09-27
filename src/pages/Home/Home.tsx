import React from 'react';
import '../../styles/Home.css';

import { useLocation } from 'react-router-dom';
import TextField from '../../components/TextField';
import Task from '../../components/Task';
import { useTask } from '../../context/TaskContext';

const Home = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const { tasks, setTasks } = useTask();
  // const { state } = location.state || {};

  return (
    <div className="home-page">
      <div className="info">
        <p> hello {location.state?.name}! </p>
        <p> You've got</p>
        <h1> {2} / 2 </h1>
        <p> tasks today!</p>
        <TextField
          borderVisible={true}
          placeholder="Enter your task"
          onSend={(taskTitle) => {
            const newTask: Task = { id: tasks.length + 1, title: taskTitle };
            setTasks((prevTasks) => [...prevTasks, newTask]);
            // #6 api 호출
            console.log(tasks.length);
          }}
        />
      </div>
      <Task />
    </div>
  );
};

export default Home;
