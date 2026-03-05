
import '../css/navbars.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom py-2 shadow-sm">
      <div className="container-fluid px-4">
        {/* Logo Section */}
        <div className="navbar-brand d-flex align-items-center">
          <div className="logo-box-dark me-2"></div>
          <span className="brand-text">Software Personal Management System</span>
        </div>

        {/* Mobile Toggle */}
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#adminNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links Section */}
        <div className="collapse navbar-collapse" id="adminNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link to={'/admin/dashbord'} className="nav-link active">Dashbord</Link></li>
            <li className="nav-item"><Link className="nav-link" to={'/admin/empolyees'}>Employees</Link></li>
            <li className="nav-item"><Link className="nav-link" to={'/admin/tasks'}>Tasks</Link></li>
            <li className="nav-item"><Link className="nav-link" to={'/admin/leaves'}>Leaves</Link></li>
          </ul>

          {/* Profile Section */}
          <div className="d-flex align-items-center profile-section">
            <FontAwesomeIcon icon={faBell} className="me-3 text-dark cursor-pointer" />
            <div className="admin-profile d-flex align-items-center px-3 py-1">
              <FontAwesomeIcon icon={faUserCircle} className="me-2 fa-lg" />
              <span className="fw-bold">Admin</span>
              <span className="dropdown-arrow ms-2">▼</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
