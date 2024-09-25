import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../../components/TextField';
// import { useNavigate, Link, useLocation } from 'react-router-dom';

// const sessionStorage = window.sessionStorage.getItem('name');

const Login = () => {
  const [name, setName] = useState<string>('');
  const [previousLogin, setPreviousLogin] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    if (storedName) {
      setPreviousLogin(JSON.parse(storedName)); // Set the previous login if it exists
    }
  }, []);

  const handleNameSend = (value: string) => {
    setName(value); // Update state with input value
    const existingNames = JSON.parse(sessionStorage.getItem('name') || '[]');

    // Add the new name to the list if it's not already present
    if (!existingNames.includes(value)) {
      existingNames.push(value); // Add the new name
      sessionStorage.setItem('name', JSON.stringify(existingNames)); // Store the updated names in sessionStorage
      setPreviousLogin(existingNames); // Update state to reflect the new list
    }
    navigate('/Home');
  };

  return (
    <div>
      <h1>Welome</h1>

      <h2> What is your name? </h2>
      <TextField borderVisible={true} placeholder="Input your name" onSend={handleNameSend} />
    </div>
  );
};

export default Login;
