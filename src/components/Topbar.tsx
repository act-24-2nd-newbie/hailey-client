import CurrentDateTime from './CurrentDateTime';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // 필요한 아이콘을 가져옵니다.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import '../styles/Topbar.css';
import type { TopbarProps } from '../type/Interface';

const Topbar = ({ title = 'My Todo' }: TopbarProps) => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/login');
  };
  return (
    <div className="topbar">
      <div className="topber-left">
        {/* <FontAwesomeIcon icon={faUser}  /> */}
        <FontAwesomeIcon
          icon={faUser} // 사용하고자 하는 아이콘
          className="logo-login"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer', fontSize: '24px' }} // 클릭 가능하게 커서 변경 및 크기 조정
        />
      </div>

      <div className="topbar-center">
        <h1>{title}</h1>
      </div>

      <div className="topbar-right">
        <CurrentDateTime />
      </div>
    </div>
  );
};

export default Topbar;
