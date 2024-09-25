import Topbar from './components/Topbar';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import { Route, Routes } from 'react-router-dom';
// import Router from './pages/Routes';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <Topbar />
      {/* <Router /> */}
      <Routes>
        <Route path="/login" Component={Login}></Route>
        <Route path="/main" Component={Main}></Route>
      </Routes>
    </div>
  );
}

export default App;
