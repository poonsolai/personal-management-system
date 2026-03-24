
import '../css/navbars.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const EmployeeNavbar = () => {
  
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext);//global variable
  const [active, setActive] = useState({dash:true, sal:false, task:false, leave:false}); 
  // 
  useEffect(()=>{
   let user = JSON.parse(localStorage.getItem('user'));
   if(user.role == 'employee'){
    navigate('/employee/dashbord');
   }
  },[]);

  function logoutFunction(){
    logout()// call logout function
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-custom py-2 shadow-sm">
      <div className="container-fluid px-4">

        <div className="navbar-brand d-flex align-items-center"> 
          <img src={logo} alt="" className='image me-4'/>
          <h1 className=" text">POOKAL THOTTAM</h1>
        </div>

        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#empNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="empNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className={active.dash?"nav-link live":"nav-link "}  to={'/employee/dashbord'} onClick={()=>{setActive({dash:true, sal:false, task:false, leave:false})}}>Dashboard</Link></li>
            <li className="nav-item"><Link className={active.task?"nav-link live":"nav-link "} to={'/employee/tasks'} onClick={()=>{setActive({dash:false, sal:false, task:true, leave:false})}}>My Tasks</Link></li>
            <li className="nav-item"><Link className={active.leave?"nav-link live":"nav-link "} to={'/employee/leaves'} onClick={()=>{setActive({dash:false, sal:false, task:false, leave:true})}}>My Leaves</Link></li>
            <li className="nav-item"><Link className={active.sal?"nav-link live":"nav-link "} to={'/employee/salary'} onClick={()=>{setActive({dash:false, sal:true, task:false, leave:false})}}>My Salary</Link></li>
          </ul>

          <div className="welcome-text d-flex align-items-center">
            <span className="me-2 fw-medium">Welcome <strong className="text-dark">!</strong></span>
            <FontAwesomeIcon icon={faUserCircle} size="lg" className="text-dark" />
            <span className="ms-2 bg-danger rounded-5 px-3 py-1 text-light cursor-pointer" onClick={logoutFunction}>LogOut</span>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default EmployeeNavbar;
