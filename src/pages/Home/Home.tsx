import React from 'react';
import '../../styles/Home.css';

import { useLocation } from 'react-router-dom';

import TextField from '../../components/TextField';
import List from '../../components/List';
import TaskField from '../../components/TaskField';

import type { Task } from '../../type/Interface';
import { useTask } from '../../context/TaskContext';

import illust_empty from '../../assets/illust_empty.png';

const Home = () => {
  const location = useLocation();
  const { tasks, setTasks, sortedTasks, setSortedTasks, sortOrder, setSortOrder } = useTask();

  const handleSortChange = (value: string) => {
    setSortOrder(value);

    // const sorted = [...tasks].sort((a, b) => {
    //   if (value === 'oldest') {
    //     return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
    //   }
    //   return new Date(a.created_date).getTime() - new Date(b.created_date).getTime();
    // });

    // setSortedTasks(sorted);
    console.log('sortOrder : ', value);
  };

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
            const newTask: Task = {
              id: tasks.length + 1,
              contents: taskTitle,
              is_done: false,
              modified_date: new Date(),
              created_date: new Date(),
            };
            setTasks((prevTasks) => [...prevTasks, newTask]);
            // #6 api 호출
            console.log(tasks.length);
          }}
        />
      </div>

      <div className="task-container">
        <div className="task-sort">
          <List title={'task'} data={['oldest', 'latest']} onSelect={handleSortChange} />
        </div>
        <div className="task-clear">
          <button> clear all </button>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="no-task">
              <img className="no-task-img" src={illust_empty} />
              <p className="no-task-text"> There is no task registered. </p>
            </div>
          ) : (
            tasks.map((task: Task) => <TaskField id={task.id} contents={task.contents} date={task.modified_date} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
