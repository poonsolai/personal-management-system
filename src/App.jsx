import 'bootstrap/dist/css/bootstrap.min.css'; //import bootstrap css file
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  //import bootstrap js file
import { Routes, Route } from 'react-router-dom';
//navbar pages
import AdminNavbar from './components/AdminNavbar';
import EmployeeNavbar from './components/EmployeeNavbar';
import './index.css'
//empolyee pages
import EmployeeDashboard from './pages/Employee/EmployeeDashPage';
import LeavePage from './pages/Employee/LeavePage';
import TaskPage from './pages/Employee/TaskPage';
import SalaryPage from './pages/Employee/SalaryPage'; 
//Admin pages
import LeavePageAdmin from './pages/Admin/LeavePageAdmin';
import AdminDashboard from './pages/Admin/AdminDashPage';
import EmpolyeePageAdmin from './pages/Admin/EmployeePageAdmin';
import TaskPageAdmin from './pages/Admin/TaskPageAdmin';


const App = () => {
  return (
    <div>
      <AdminNavbar/>
      <EmployeeNavbar/>
      <Routes>
        
        //employee routes
          <Route path='/employee/dashboard' element={<EmployeeDashboard/>}></Route>
          <Route path='/employee/leaves' element={<LeavePage/>}></Route>
          <Route path='/employee/tasks' element={<TaskPage/>}></Route>
          <Route path='/employee/salary' element={<SalaryPage/>}></Route>
        //admin routes
          <Route path='/admin/dashbord' element={<AdminDashboard/>}></Route>
          <Route path='/admin/empolyees' element={<EmpolyeePageAdmin/>}></Route>
          <Route path='/admin/tasks' element={<TaskPageAdmin/>}></Route>
          <Route path='/admin/leaves' element={<LeavePageAdmin/>}></Route>

      </Routes>
    </div>
  )
}

export default App
