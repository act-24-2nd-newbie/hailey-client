import React, { useState, useEffect } from 'react';
import TextField from '../../components/TextField';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Login.css';

const Login = () => {
  const [name, setName] = useState<string>('');
  const [previousLogin, setPreviousLogin] = useState<string[]>([]);
  const navigate = useNavigate();
  const { login } = useAuth();

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
    login();
    navigate('/Home', { replace: true, state: { name: value, login: true } });
  };

  return (
    <div className="login-page">
      <p>Welome</p>
      <h1> What is your name? </h1>
      <TextField borderVisible={true} placeholder="Input your name" onSend={handleNameSend} />
    </div>
  );
};

export default Login;
