import React from 'react';
import '../../styles/Home.css';
import illust_empty from '../../../public/illust_empty.png';
import { useLocation } from 'react-router-dom';
import TextField from '../../components/TextField';
import List from '../../components/List';
import { useTask } from '../../context/TaskContext';

const Home = () => {
  const location = useLocation();
  const { taskCount } = useTask();
  // const navigate = useNavigate();
  // const { state } = location.state || {};

  return (
    <div className="home-page">
      <div className="info">
        <p> hello {location.state?.name}! </p>
        <p> You've got</p>
        <h1> {taskCount} / 2 </h1>
        <p> task{taskCount > 1 ? 's' : ''} today!</p>
        <TextField borderVisible={true} placeholder="Enter your task" onSend={() => {}} />
      </div>

      <div className="task">
        <div className="task-info-container">
          <div className="List">
            <List title="task-info" data={['Oldest', 'Latest']} />
          </div>
          <div className="button-container">
            <button className="button">Clear All</button>
          </div>
        </div>
        <div className="task-img-container">
          <img className="task-img" src={illust_empty} />
        </div>
        <div className="task-text-container">
          <p className="task-text">{taskCount > 0 ? `task :  ${taskCount}` : 'There is no task registered.'}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
