import React from 'react';
// import TextField from '../../components/TextField';
import { useLocation } from 'react-router-dom';
// import { useNavigate, Link, useLocation } from 'react-router-dom';

const Home = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  // const { state } = location.state || {};

  return (
    <div>
      <h1> hello {location.state?.name}! </h1>
      <h3> You've got {2} / 2 task(s) today! </h3>
      {/* <h3>With Border</h3>
      <TextField borderVisible={true} placeholder="" onSend={() => {}} />

      <h3>Without Border</h3>
      <TextField borderVisible={false} placeholder="" onSend={() => {}} /> */}
    </div>
  );
};

export default Home;
