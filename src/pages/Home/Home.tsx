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
  const { tasks, setTasks, setSortOrder } = useTask();

  const handleCreateTask = (taskTitle: string) => {
    // #6 api 호출
    axios
      .post('http://localhost:8080/tasks', { contents: taskTitle })
      .then((response) => {
        console.log('Book added successfully.');
        const newTask: Task = {
          id: response.data.id,
          contents: response.data.contents,
          is_done: false,
          modified_date: new Date(),
          created_date: new Date(),
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
      })
      .catch((error) => {
        console.log('Error while adding book:', error);
      });
  };

  const handleClearAll = () => {
    // #11 delete api 호출
    axios
      .delete('http://localhost:8080/tasks')
      .then(() => {
        console.log('Book added successfully.');
      })
      .catch((error) => {
        console.log('Error while adding book:', error);
      });

    setTasks([]);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    console.log('sortOrder : ', value);
  };

  return (
    <div className="home-page">
      <div className="info">
        <p
          style={{
            top: '72px',
          }}
        >
          {' '}
          hello {location.state?.name}!{' '}
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
          {2} / 2{' '}
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
          width={1120}
          top={284}
          left={60}
          borderVisible={true}
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
          ) : (
            tasks.map((task: Task) => (
              <TaskField
                key={task.id}
                id={task.id}
                contents={task.contents}
                isDone={task.is_done}
                createdDate={task.created_date}
                modifiedDate={task.modified_date}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
