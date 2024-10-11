import { BrowserRouter } from 'react-router-dom';
import Topbar from './components/Topbar';

import Router from './pages/Routes';

function App() {
  return (
    <div className="container" style={{ height: '100vh' }}>
      <BrowserRouter>
        <Topbar />

        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
