import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '../../components/TextField';
import { useAuth } from '../../context/AuthContext';

const SignUp = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();
  const { setIsSigned } = useAuth();

  useEffect(() => {
    setIsSigned(false);
  }, []);

  const handleSignUp = () => {
    if (name != '' && email != '') {
      axios
        .post('http://localhost:8080/members', { username: name, email: email })
        .then((response) => {
          console.log(response.data);
        })
        .catch(() => {});
      navigate('/', { replace: true, state: { name: name, email: email } });
    }
    setIsSigned(true);
  };
  return (
    <div>
      <h1> Sign Up </h1>
      <TextField
        style={{ width: '680px', height: 'auto', top: '292px', left: '120px' }}
        placeholder="Input your name"
        field="signup"
        onSend={(value) => {
          setName(value);
        }}
      />
      <TextField
        style={{ width: '680px', height: 'auto', top: '292px', left: '120px' }}
        placeholder="Input your email"
        type="email"
        field="signup"
        onSend={(value) => {
          setEmail(value);
        }}
      />

      <button onClick={handleSignUp} className="confirm" disabled={name == '' || email == ''}>
        {' '}
        confirm{' '}
      </button>
    </div>
  );
};

export default SignUp;
