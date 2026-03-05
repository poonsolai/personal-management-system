import '../css/signup.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const SignUpPage = ({ toggleForm }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg border-0 signup-card w-100" style={{ maxWidth: '450px' }}>
        <div className="card-header border-0 text-center py-4 bg-yellow">
          <div className="logo-placeholder mx-auto mb-2"></div>
          <small className="d-block fw-bold mb-1">Software Personal Management System</small>
          <h5 className="mb-0 fw-bold">Employee & Admin Sign Up</h5>
        </div>
        <div className="card-body p-4 p-md-5">
          <h3 className="text-center mb-4 fw-bold">Employee & Admin Sign Up</h3>
          <form>
            <div className="mb-3">
              <label className="form-label small fw-bold">Full Name</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <FontAwesomeIcon icon={faUser} className="text-muted" />
                </span>
                <input type="text" className="form-control border-start-0 ps-0" placeholder="Full Name" />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <FontAwesomeIcon icon={faEnvelope} className="text-muted" />
                </span>
                <input type="email" className="form-control border-start-0 ps-0" placeholder="Email Address" />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <FontAwesomeIcon icon={faLock} className="text-muted" />
                </span>
                <input type="password" className="form-control border-start-0 ps-0" placeholder="Password" />
              </div>
              <small className="text-muted" style={{ fontSize: '0.7rem' }}>Password must be atleast 8 characters.</small>
            </div>
            <button type="submit" className="btn btn-yellow w-100 py-2 fw-bold shadow-sm mt-3">Sign Up</button>
          </form>
          <p className="text-center mt-4 small">
            Already have an account? <span className="text-primary fw-bold cursor-pointer" onClick={toggleForm}>Login</span>
          </p>
        </div>
        <div className="card-footer bg-transparent border-0 text-center pb-4">
          <small className="text-muted">© 2024 Software Personal Management System. All rights reserved.</small>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
