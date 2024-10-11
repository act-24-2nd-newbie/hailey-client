import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '../../components/TextField';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Login.css';
import MsgField from '../../components/MsgField';

const Login = () => {
  // const [name, setName] = useState<string>('');
  // const [previousLogin, setPreviousLogin] = useState<string[]>([]);
  const navigate = useNavigate();
  const { login, isSigned } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // useEffect(() => {
  //   const storedName = sessionStorage.getItem('name');
  //   if (storedName) {
  //     setPreviousLogin(JSON.parse(storedName));
  //   }
  // }, []);

  const handleEmailSend = (value: string) => {
    // setName(value);
    const existingEmail = JSON.parse(sessionStorage.getItem('email') || '[]');

    if (!existingEmail.includes(value)) {
      existingEmail.push(value);
      sessionStorage.setItem('name', JSON.stringify(existingEmail));
      // setPreviousLogin(existingNames);
    }
    axios
      .get(`http://localhost:8080/members/${value}`)
      .then((response) => {
        if (response.data.success) {
          login();
          navigate('/Home', { replace: true, state: { email: value, login: true } });
        } else {
          console.log('Not registered user.');
          setErrorMessage('Not registered user.');
          setTimeout(() => {
            setErrorMessage(null); // 3초 후 메시지 숨기기
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-page">
      <p
        style={{
          width: '800px',
          top: '108px',
          left: '120px',
          position: 'absolute',
          lineHeight: '36px',
          fontFamily: 'Roboto',
          fontSize: '24px',
          color: 'rgba(44, 62, 80, 1)',
          fontWeight: '400',
        }}
      >
        Welcome Newbie!! <br /> MyTodo makes it easy to stay organized and manage your life.
      </p>

      <h1 style={{ width: '663px', height: '72px', top: '204px', left: '120px', position: 'absolute' }}>
        {' '}
        What is your email?{' '}
      </h1>
      <TextField
        style={{ width: '680px', height: 'auto', top: '292px', left: '120px' }}
        placeholder="Input your email"
        onSend={handleEmailSend}
      />

      {isSigned && (
        <MsgField
          message="Registered successfully"
          style={{ bottom: '0', left: '50%', transform: 'translateX(-50%)', position: 'fixed' }}
        />
      )}
      {errorMessage && (
        <MsgField
          message={errorMessage}
          style={{ bottom: '0', left: '50%', transform: 'translateX(-50%)', position: 'fixed' }}
        />
      )}
    </div>
  );
};

export default Login;
