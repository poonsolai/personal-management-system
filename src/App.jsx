import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from './pages/SignUpPage';
//navbar
import AdminNavbar from './components/AdminNavbar'
import EmployeeNavbar from './components/EmployeeNavbar';
//admin pages
import AdminDashboard from "./pages/Admin/AdminDashPage";
import EmployeePageAdmin from './pages/Admin/EmployeePageAdmin';
import TaskPageAdmin from './pages/Admin/TaskPageAdmin';
import LeavePageAdmin from "./pages/Admin/LeavePageAdmin";
//employee pages
import EmployeeDashPage from './pages/Employee/EmployeeDashPage';
import LeavePage from './pages/Employee/LeavePage';
import SalaryPage from './pages/Employee/SalaryPage';
import TaskPage from './pages/Employee/TaskPage';
//context 
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
// home page
import Home from "./pages/HomePage";
import SalaryPageAdmin from "./pages/Admin/SalaryPageAdmin";
const App = () => {
  const navigate = useNavigate();

  const {user} = useContext(AuthContext); // global variable

  useEffect(()=>{
    if(user?.role){
      user.role == "admin" ? navigate('/admin/dashbord') : navigate('/employee/dashbord');
    }
  },[]);

  return (
      
    <div>
      {
        user?.role == "admin" && <AdminNavbar/> // ? is use user null or undefied irundha andha error handle panna
      }
      {
        user?.role == "employee" && <EmployeeNavbar/>
      } 

      <Routes>
        <>
          <Route path="/" element={<Home/>}></Route>
        </>
        {
          user?.role ? <></> :<>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/signup" element={<SignUpPage/>}></Route></>
        }

        {
          user?.role == "admin" && 
          <>
            <Route path="/admin/dashbord" element={<AdminDashboard/>}></Route>
            <Route path='/admin/empolyees' element={<EmployeePageAdmin/>}></Route>
            <Route path='/admin/tasks' element={<TaskPageAdmin/>}></Route>
            <Route path='admin/leaves' element={<LeavePageAdmin/>}></Route>
            <Route path='/admin/payslip' element={<SalaryPageAdmin/>}></Route>
          </>
        }

        {
          user?.role == "employee" && 
          <>
            <Route path="/employee/dashbord" element={<EmployeeDashPage/>} />
            <Route path="/employee/tasks" element={<TaskPage/>} />
            <Route path="/employee/leaves" element={<LeavePage/>} />
            <Route path="/employee/salary" element={<SalaryPage/>} />
          </>
        }
      </Routes>
    </div>

  )
}

export default App
