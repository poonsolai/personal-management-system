import '../../css/dashbord.css'

const AdminDashboard = () => {
  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Welcome Admin!</h2>
      
      {/* Top Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-primary text-white p-3 dash-card">
            <p className="mb-1">Total Employees</p>
            <h1 className="fw-bold">25</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-orange text-white p-3 dash-card">
            <p className="mb-1">Active Tasks</p>
            <h1 className="fw-bold">12</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-success text-white p-3 dash-card">
            <p className="mb-1">Pending Leave Requests</p>
            <h1 className="fw-bold">3</h1>
          </div>
        </div>
      </div>

      {/* Recent Tasks Table */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-0">
          <div className="p-3 border-bottom"><h5 className="mb-0 fw-bold">Recent Tasks</h5></div>
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>Task</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Website Update</td><td>John Doe</td><td><span className="badge bg-warning-light text-dark">In Progress</span></td><td>2024-15-09</td></tr>
              <tr><td>Website Migrations</td><td>Emily Smith</td><td><span className="badge bg-warning-light text-dark">In Progress</span></td><td>2024-15-09</td></tr>
              <tr><td>Leave Request</td><td>Vacation</td><td><span className="badge bg-light text-dark">Pending</span></td><td>2024-15-09</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats Section */}
      <h5 className="fw-bold mb-3">Quick Stats</h5>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-4 d-flex flex-row align-items-center justify-content-between">
            <div><p className="text-muted mb-0">Monthly Payroll:</p><h3 className="text-primary fw-bold">$45,000</h3></div>
            <i className="bi bi-wallet2 fs-1 text-primary opacity-50"></i>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-4 d-flex flex-row align-items-center justify-content-between">
            <div><p className="text-muted mb-0">Completed Tasks</p><h3 className="text-danger fw-bold">87%</h3></div>
            <i className="bi bi-graph-up fs-1 text-danger opacity-50"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
