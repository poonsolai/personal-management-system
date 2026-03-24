
import '../css/navbars.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
const AdminNavbar = () => {
  
  const navigate = useNavigate();
  const {user,logout} = useContext(AuthContext);//global variable
  const [active, setActive] = useState({dash:true, emp:false, task:false, leave:false, payslip :false});
  // 
    useEffect(()=>{
     let user = JSON.parse(localStorage.getItem('user'));
     if(user.role == 'admin'){
      navigate('/admin/dashbord');
     }
    },[]);

  async function logoutFunction(){
    // const res = axios.get("http://localhost:3000/auth/logout", {withCredentials:true});
    // console.log(res.data);
    logout()// call logout function
    navigate('/');
  }
 

  return (
    <nav className="navbar navbar-expand-lg navbar-custom py-2 shadow-sm">
      <div className="container-fluid px-4">
        {/* Logo Section */}
        <div className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="" className='image me-4'/>
          <h1 className=" text">POOKAL THOTTAM</h1>
        </div>

        {/* Mobile Toggle */}
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#adminNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links Section */}
        <div className="collapse navbar-collapse" id="adminNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link to={'/admin/dashbord'} className={active.dash?"nav-link live":"nav-link "} onClick={()=>{setActive({dash:true, emp:false, task:false, leave:false, payslip :false})}}>Dashbord</Link></li>
            <li className="nav-item"><Link className={active.emp?"nav-link live":"nav-link "} to={'/admin/empolyees'} onClick={()=>{setActive({dash:false, emp:true, task:false, leave:false, payslip :false})}}>Employees</Link></li>
            <li className="nav-item"><Link className={active.task?"nav-link live":"nav-link "} to={'/admin/tasks'} onClick={()=>{setActive({dash:false, emp:false, task:true, leave:false, payslip :false})}}>Tasks</Link></li>
            <li className="nav-item"><Link className={active.leave?"nav-link live":"nav-link "} to={'/admin/leaves'} onClick={()=>{setActive({dash:false, emp:false, task:false, leave:true, payslip :false})}}>Leaves</Link></li>
            <li className="nav-item"><Link className={active.payslip?"nav-link live":"nav-link "} to={'/admin/payslip'} onClick={()=>{setActive({dash:false, emp:false, task:false, leave:false, payslip :true})}}>Payslip</Link></li>
          </ul>

          {/* Profile Section */}
          <div className="d-flex align-items-center profile-section " >
            {/* <FontAwesomeIcon icon={faBell} className="me-3 text-dark cursor-pointer" /> */}
            <div className="admin-profile d-flex  px-3 py-1 pb-0 navbar-toggler" 
            data-bs-toggle="offcanvas"
            data-bs-target="#Id2"
            aria-controls="Id2">
              <FontAwesomeIcon icon={faUserCircle} className="me-2 fa-lg" />
              <h5 className="fw-bold"> {user.name}</h5>
            </div>
            <span className="ms-2 bg-danger rounded-5 px-3 py-1 text-light cursor-pointer" onClick={logoutFunction}>LogOut</span>
          </div>
        </div>

      

      </div>
    </nav>
  );
};


export default AdminNavbar;
