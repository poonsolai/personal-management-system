import '../../css/dashbord.css'

const EmployeeDashboard = () => {
  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Hello Karthick!</h2>
      
      {/* Top Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-primary text-white p-3 dash-card">
            <p className="mb-1">My Tasks</p>
            <h1 className="fw-bold">5</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-orange text-white p-3 dash-card">
            <p className="mb-1">Leave Balance</p>
            <h1 className="fw-bold">8 Days</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-success text-white p-3 dash-card">
            <p className="mb-1">My Salary</p>
            <h1 className="fw-bold">$50,000</h1>
          </div>
        </div>
      </div>

      {/* My Tasks Section */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="p-3 d-flex justify-content-between">
          <h5 className="mb-0 fw-bold">My Tasks</h5>
          <button className="btn btn-primary btn-sm px-3">View All Tasks</button>
        </div>
        <table className="table mb-0">
          <thead className="table-light">
            <tr><th>Task</th><th>Status</th><th>Deadline</th></tr>
          </thead>
          <tbody>
            <tr><td>Bug Fixing</td><td><span className="badge bg-success-light text-success">In Progress</span></td><td>2024-05-09</td></tr>
            <tr><td>Feature Progress</td><td><span className="badge bg-primary-light text-primary">In Progress</span></td><td>2024-05-09</td></tr>
          </tbody>
        </table>
      </div>

      {/* My Leave Requests Section */}
      <div className="card shadow-sm border-0">
        <div className="p-3 d-flex justify-content-between">
          <h5 className="mb-0 fw-bold">My Leave Requests</h5>
          <button className="btn btn-primary btn-sm px-3">Apply for Leave</button>
        </div>
        <table className="table mb-0">
          <thead className="table-light">
            <tr><th>From - To</th><th>Reason</th><th>Deadline</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td>Feb 10 - Feb 12</td><td>Medical Leave</td><td>2024-05-09</td><td><span className="badge bg-success-light text-success">Approved</span></td></tr>
            <tr><td>Feb 01 - Feb 02</td><td>Sick Leave</td><td>2024-05-09</td><td><span className="badge bg-warning-light text-warning">Approved</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
