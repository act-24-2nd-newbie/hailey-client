import React from 'react';
import TextField from '../../components/TextField';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Login.css';

const Login = () => {
  // const [name, setName] = useState<string>('');
  // const [previousLogin, setPreviousLogin] = useState<string[]>([]);
  const navigate = useNavigate();
  const { login } = useAuth();

  // useEffect(() => {
  //   const storedName = sessionStorage.getItem('name');
  //   if (storedName) {
  //     setPreviousLogin(JSON.parse(storedName));
  //   }
  // }, []);

  const handleNameSend = (value: string) => {
    // setName(value);
    const existingNames = JSON.parse(sessionStorage.getItem('name') || '[]');

    if (!existingNames.includes(value)) {
      existingNames.push(value);
      sessionStorage.setItem('name', JSON.stringify(existingNames));
      // setPreviousLogin(existingNames);
    }
    login();
    navigate('/Home', { replace: true, state: { name: value, login: true } });
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
        What is your name?{' '}
      </h1>
      <TextField
        style={{ width: '680px', top: '292px', left: '120px' }}
        borderVisible={true}
        placeholder="Input your name"
        onSend={handleNameSend}
      />
    </div>
  );
};

export default Login;
