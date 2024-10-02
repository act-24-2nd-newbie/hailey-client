import Topbar from './components/Topbar';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="container" style={{ height: '100vh' }}>
      <Topbar />
      <Routes>
        <Route path="/" Component={Login}></Route>
        <Route path="/Home" Component={Home}></Route>
      </Routes>
    </div>
  );
}

export default App;
