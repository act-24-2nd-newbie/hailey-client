import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/main.css';
import axios from 'axios';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { BrowserRouter } from 'react-router-dom';
axios.defaults.baseURL = 'http://localhost:8080/tasks';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
