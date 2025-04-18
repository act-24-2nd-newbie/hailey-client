import '../../styles/Home.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import TextField from '../../components/TextField';
import List from '../../components/List';
import TaskField from '../../components/TaskField';

import type { Task } from '../../type/Interface';
import { useTask } from '../../context/TaskContext';

import illust_empty from '../../assets/illust_empty.png';

const Home = () => {
  const location = useLocation();
  const { tasks, setTasks, sortOrder, setSortOrder, countTasks, countDoneTasks, setCountTasks, setCountDoneTasks } =
    useTask();

  const handleCreateTask = (taskTitle: string) => {
    // #6 api 호출
    axios
      .post('http://localhost:8080/tasks', { contents: taskTitle })
      .then((response) => {
        const newTask: Task = {
          id: response.data.id,
          contents: response.data.contents,
          isDone: response.data.isDone,
          modifiedDate: response.data.modifiedDate,
          createdDate: response.data.createdDate,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setCountTasks(countTasks + 1);
      })
      .catch(() => {});
  };

  const handleClearAll = () => {
    // #11 delete api 호출
    axios
      .delete('http://localhost:8080/tasks')
      .then(() => {})
      .catch(() => {});
    setCountTasks(0);
    setCountDoneTasks(0);
    setTasks([]);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  function welcomeMsg() {
    const now = new Date();
    const hour = now.getHours();

    // console.log(hour);
    if (hour >= 7 && hour < 12) return 'Good morning, ';
    else if (hour >= 12 && hour < 18) return 'Good afternoon, ';
    else if (hour >= 18 && hour < 22) return 'Good evening, ';
    else return 'Good night, ';
  }

  return (
    <div className="home-page">
      <div className="info">
        <p
          style={{
            top: '72px',
          }}
        >
          {' '}
          {welcomeMsg()} {location.state?.name}!{' '}
        </p>
        <p
          style={{
            top: '124px',
          }}
        >
          {' '}
          You've got
        </p>
        <h1
          style={{
            position: 'absolute',
            top: '160px',
            left: '60px',
            fontFamily: 'Roboto',
            fontSize: '48px',
            fontWeight: '700',
            lineHeight: '72px',
            textAlign: 'left',
          }}
        >
          {' '}
          {countDoneTasks} / {countTasks}{' '}
        </h1>
        <p
          style={{
            top: '232px',
          }}
        >
          {' '}
          tasks today!
        </p>

        <TextField
          style={{ width: '1120px', top: '284px', left: '60px' }}
          placeholder="Enter your task"
          onSend={(taskTitle) => handleCreateTask(taskTitle)}
        />
      </div>

      <div className="task-container">
        <div className="task-selector">
          <List title={'task'} data={['Oldest', 'Latest']} onSelect={handleSortChange} />

          {tasks.length !== 0 ? (
            <button className="task-clear" onClick={handleClearAll}>
              {' '}
              clear all{' '}
            </button>
          ) : (
            <p
              style={{
                width: '120px',
                height: '40px',
                color: 'gray',
                fontSize: '16px',
                position: 'relative',
                textAlign: 'center',
                marginTop: '10px',
              }}
            >
              {' '}
              clear all{' '}
            </p>
          )}
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="no-task">
              <img className="no-task-img" src={illust_empty} />
              <p className="no-task-text"> There is no task registered. </p>
            </div>
          ) : sortOrder === 'Oldest' ? (
            tasks.map((task: Task) => (
              <TaskField
                key={task.id}
                id={task.id}
                contents={task.contents}
                isDone={task.isDone}
                createdDate={task.createdDate}
                modifiedDate={task.modifiedDate}
              ></TaskField>
            ))
          ) : (
            tasks
              .slice()
              .reverse()
              .map((task: Task) => (
                <TaskField
                  key={task.id}
                  id={task.id}
                  contents={task.contents}
                  isDone={task.isDone}
                  createdDate={task.createdDate}
                  modifiedDate={task.modifiedDate}
                ></TaskField>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
