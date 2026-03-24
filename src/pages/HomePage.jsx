
import '../css/home.css';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm px-4">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center fw-bold text-primary" href="#">
            <div className="logo-square me-2"></div>
            SPMS
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item"><a className="nav-link mx-2" href="#features">Features</a></li>
              <li className="nav-item"><a className="nav-link mx-2" href="#about">About</a></li>
              <li className="nav-item">
                <Link className="btn btn-outline-primary mx-2 px-4 rounded-pill" to={'/login'}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary px-4 rounded-pill" to={'/signup'}>Get Started</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section text-center d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">Manage Your Team <span className="text-primary">Effortlessly</span></h1>
              <p className="lead text-muted mb-5">
                The all-in-one Software Personal Management System to track tasks, 
                manage leaves, and monitor performance in one place.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-primary btn-lg px-5 py-3 shadow">Try for Free</button>
                <button className="btn btn-light btn-lg px-5 py-3 border shadow-sm">Watch Demo</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Preview */}
      <section id="features" className="py-5 bg-light">
        <div className="container py-5 text-center">
          <h2 className="fw-bold mb-5">Why Choose SPMS?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card p-4 bg-white shadow-sm rounded-4">
                <div className="icon-box bg-primary-light mb-3">📅</div>
                <h5>Task Management</h5>
                <p className="text-muted small">Assign and track tasks with real-time status updates.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 bg-white shadow-sm rounded-4">
                <div className="icon-box bg-orange-light mb-3">📝</div>
                <h5>Leave Requests</h5>
                <p className="text-muted small">Simple and fast leave application and approval workflow.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 bg-white shadow-sm rounded-4">
                <div className="icon-box bg-green-light mb-3">📊</div>
                <h5>Quick Stats</h5>
                <p className="text-muted small">Get insightful data on team performance and payroll.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
