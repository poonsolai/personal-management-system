import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; //
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { LeaveProvider } from './context/LeaveContext.jsx';
import SalaryPageAdmin from './pages/Admin/SalaryPageAdmin.jsx';


createRoot(document.getElementById('root')).render(
  <LeaveProvider>
  <AuthProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AuthProvider>
  </LeaveProvider>
)
