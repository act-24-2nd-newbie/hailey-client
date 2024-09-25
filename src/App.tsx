import Topbar from './components/Topbar';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
// import Router from './pages/Routes';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <Topbar />
      {/* <Router /> */}
      <Routes>
        <Route path="/" Component={Login}></Route>
        <Route path="/Home" Component={Home}></Route>
      </Routes>
    </div>
  );
}

export default App;
