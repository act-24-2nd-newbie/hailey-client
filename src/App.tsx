import './App.css';
import Topbar from './components/Topbar';
import Login from './pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
// import Router from './pages/Routes';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <p> hello main page.</p>
      <Topbar />
      {/* <Router /> */}
      <Routes>
        <Route path="/login" Component={Login}></Route>
      </Routes>
    </div>
  );
}

export default App;
