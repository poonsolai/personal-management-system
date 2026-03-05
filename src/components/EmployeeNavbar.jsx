
import '../css/navbars.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const EmployeeNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom py-2 shadow-sm">
      <div className="container-fluid px-4">
        <div className="navbar-brand d-flex align-items-center">
          <div className="logo-box-dark me-2"></div>
          <span className="brand-text">Software Personal Management System</span>
        </div>

        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#empNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="empNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link active" to={'/employee/dashboard'}>Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to={'/employee/tasks'}>My Tasks</Link></li>
            <li className="nav-item"><Link className="nav-link" to={'/employee/leaves'}>My Leaves</Link></li>
            <li className="nav-item"><Link className="nav-link" to={'/employee/salary'}>My Salary</Link></li>
          </ul>

          <div className="welcome-text d-flex align-items-center">
            <span className="me-2 fw-medium">Welcome, <strong className="text-dark">Karthick!</strong></span>
            <FontAwesomeIcon icon={faUserCircle} size="lg" className="text-dark" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EmployeeNavbar;
