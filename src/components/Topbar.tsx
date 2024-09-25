import CurrentDateTime from './CurrentDateTime';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Topbar.css';
// import ic_send from '../../public/ic_send.png';
import ic_topbar_menu from '../../public/ic_topbar_menu.png';
import type { TopbarProps } from '../type/Interface';

const Topbar = ({ title = 'My Todo' }: TopbarProps) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginLogoutClick = () => {
    if (isLoggedIn) {
      // 로그아웃 처리
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('storeid');
      setIsLoggedIn(false);
    } else {
      navigate('/login'); // 로그인 페이지로 이동
    }
  };

  return (
    <div className="topbar">
      <div className="topber-left-home" onClick={handleLogoClick}>
        <img className="topber-left-home-img" src={ic_topbar_menu} />
      </div>

      <div className="topbar-center">
        <h1>{title}</h1>
      </div>

      <div className="topbar-right-date">
        <CurrentDateTime />
      </div>

      <div>
        <button className="topbar-right-login" onClick={handleLoginLogoutClick}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Topbar;
