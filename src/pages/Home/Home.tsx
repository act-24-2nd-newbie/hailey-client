import React from 'react';
import TextField from '../../components/TextField';
// import { useNavigate, Link, useLocation } from 'react-router-dom';

const Home = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  return (
    <div>
      <h1> hello main page.</h1>
      <h3>With Border</h3>
      <TextField borderVisible={true} placeholder="" onSend={() => {}} />

      <h3>Without Border</h3>
      <TextField borderVisible={false} placeholder="" onSend={() => {}} />
    </div>
  );
};

export default Home;
