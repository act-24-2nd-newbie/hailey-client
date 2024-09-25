import React, { useState, useEffect } from 'react';
import TextField from '../../components/TextField';
import { useNavigate } from 'react-router-dom';
// import '../styles/Login.css';

const Login = () => {
  const [name, setName] = useState<string>('');
  const [previousLogin, setPreviousLogin] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = sessionStorage.getItem('name');
    if (storedName) {
      setPreviousLogin(JSON.parse(storedName));
    }
  }, []);

  const handleNameSend = (value: string) => {
    setName(value);
    const existingNames = JSON.parse(sessionStorage.getItem('name') || '[]');

    if (!existingNames.includes(value)) {
      existingNames.push(value);
      sessionStorage.setItem('name', JSON.stringify(existingNames));
      setPreviousLogin(existingNames);
    }
    navigate('/Home', { replace: true, state: { name: value } });
  };

  return (
    <div>
      <h3>Welome</h3>
      <h1> What is your name? </h1>
      <TextField borderVisible={true} placeholder="Input your name" onSend={handleNameSend} />
    </div>
  );
};

export default Login;
