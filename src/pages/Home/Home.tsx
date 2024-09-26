import React from 'react';
import '../../styles/Home.css';

import { useLocation } from 'react-router-dom';
import TextField from '../../components/TextField';

const Home = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  // const { state } = location.state || {};

  return (
    <div className="home-page">
      <div className="info">
        <p> hello {location.state?.name}! </p>
        <p> You've got</p>
        <h1> {2} / 2 </h1>
        <p> tasks today!</p>
        <TextField borderVisible={true} placeholder="Enter your task" onSend={() => {}} />
      </div>
      <div className="task">
        <p>task part </p>
      </div>
    </div>
  );
};

export default Home;
