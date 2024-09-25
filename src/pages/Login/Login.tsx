import React, { useState } from 'react';
import TextField from '../../components/TextField';
// import { useNavigate, Link, useLocation } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const handleNameSend = (value: string) => {
    setName(value); // Update state with input value
  };
  // const navigate = useNavigate();
  // const location = useLocation();
  return (
    <div>
      <h1>Login Page</h1>

      <h2> What is your name? </h2>
      <TextField borderVisible={true} placeholder="Input your name" onSend={handleNameSend} />
    </div>
  );
};

export default Login;
