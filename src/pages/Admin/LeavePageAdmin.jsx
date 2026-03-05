import './css/leaveAdmin.css'

const LeavePageAdmin = () => {
  const leaveData = [
    { id: 1, name: 'John Doe', type: 'Vacation', start: 'May 20-2024', end: 'May 25-2024', reason: 'Vacation', status: 'Pending' },
    { id: 2, name: 'Emily Smith', type: 'Sick Leave', start: 'May 10-2024', end: 'May 12-2024', reason: 'Sick Leave', status: 'Pending' },
    { id: 3, name: 'Jack Wilson', type: 'Leave Requ', start: 'May 06-2024', end: 'May 09-2024', reason: 'Medical Leave', status: 'Pending' },
    { id: 4, name: 'Sarah Lee', type: 'Vacation', start: 'Apr 22-2024', end: 'Apr 24-2024', reason: 'Vacation', status: 'Approved' },
  ];

  return (
    <div className="container-fluid p-4 dashboard-bg">
      <h2 className="mb-4 fw-bold">Leave Management</h2>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card stat-card pending text-white">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div><p className="mb-0">Pending Leave Requests</p><h3>3</h3></div>
              <i className="bi bi-clock-history fs-1 opacity-50"></i>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card stat-card approved text-white">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div><p className="mb-0">Approved Leave Requests</p><h3>12</h3></div>
              <i className="bi bi-check-circle fs-1 opacity-50"></i>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card stat-card rejected text-white">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div><p className="mb-0">Rejected Leave Requests</p><h3>2</h3></div>
              <i className="bi bi-x-circle fs-1 opacity-50"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0">Leave Requests</h5>
        </div>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.start}</td>
                  <td>{item.end}</td>
                  <td>{item.reason}</td>
                  <td>
                    <span className={`badge ${item.status === 'Approved' ? 'bg-success-light text-success' : 'bg-warning-light text-warning'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-success btn-sm me-2">Approve</button>
                    <button className="btn btn-danger btn-sm">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeavePageAdmin;
