import CurrentDateTime from './CurrentDateTime';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
import '../styles/Topbar.css';
// import ic_send from '../../public/ic_send.png';
import ic_topbar_menu from '../../public/ic_topbar_menu.png';
import type { TopbarProps } from '../type/Interface';
import { useAuth } from '../context/AuthContext';

const Topbar = ({ title = 'My Todo' }: TopbarProps) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // 로그인 상태

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate('/Home');
    } else {
      navigate('/');
    }
  };

  const handleLoginLogoutClick = () => {
    if (isLoggedIn) {
      // 로그아웃 처리
      logout();
      navigate('/');
    } else {
      navigate('/'); // 로그인 페이지로 이동
    }
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <img className="home" src={ic_topbar_menu} onClick={handleLogoClick} />
        <h2 className="title"> {title} </h2>
      </div>

      <div className="topbar-right">
        <div className="date">
          <CurrentDateTime />
        </div>
        <button className="login" onClick={handleLoginLogoutClick}>
          {isLoggedIn ? 'Logout' : 'Sign up'}
        </button>
      </div>
    </div>
  );
};

export default Topbar;
