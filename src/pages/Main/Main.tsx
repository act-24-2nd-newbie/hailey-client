import React from 'react';
import TextField from '../../components/TextField';
// import { useNavigate, Link, useLocation } from 'react-router-dom';

const Main = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  return (
    <div>
      <h1> hello main page.</h1>
      <h3>With Border</h3>
      <TextField borderVisible={true} />

      <h3>Without Border</h3>
      <TextField borderVisible={false} />
    </div>
  );
};

export default Main;
