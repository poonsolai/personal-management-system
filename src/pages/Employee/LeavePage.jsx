import './css/leave.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const LeavePage = () => {
  return (
    <div className="container-fluid py-4 leave-page">
      <h2 className="mb-4 fw-bold page-title">My Leaves</h2>

      {/* Info Cards Row */}
      <div className="row g-3 mb-5">
        <div className="col-12 col-md-4">
          <div className="stat-card orange-card shadow-sm">
            <p>Leave Balance</p>
            <h3>8 <span>Days</span></h3>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card green-card shadow-sm">
            <p>Approved Leave Days</p>
            <h3>14 <span>Days</span></h3>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card blue-card shadow-sm">
            <p>Pending Leave Days</p>
            <h3>2 <span>Days</span></h3>
          </div>
        </div>
      </div>

      {/* Requests Table Section */}
      <div className="card border-0 shadow-sm table-container p-4">
        <h4 className="mb-4 fw-bold">My Leave Requests</h4>
        
        <div className="d-flex justify-content-start mb-3">
          <button className="btn btn-dark btn-new-request">
            <FontAwesomeIcon icon={faPlus} className="me-2" /> New Leave Request
          </button>
        </div>

        <div className="table-responsive">
          <table className="table align-middle custom-table">
            <thead>
              <tr>
                <th>From-To</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Feb 10 - Feb 12</td>
                <td>Medical Leave</td>
                <td><span className="status-badge approved">Approved</span></td>
                <td><FontAwesomeIcon icon={faEllipsisH} className="text-muted cursor-pointer" /></td>
              </tr>
              <tr>
                <td>Feb 01 - Feb 02</td>
                <td>Sick Leave</td>
                <td><span className="status-badge approved">Approved</span></td>
                <td><FontAwesomeIcon icon={faEllipsisH} className="text-muted cursor-pointer" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
          <div className="pagination-buttons">
            <button className="btn btn-sm btn-outline-secondary me-2">Previous</button>
            <span className="px-3 py-1 border rounded me-2">1</span>
            <button className="btn btn-sm btn-outline-secondary">Next</button>
          </div>
          <button className="btn btn-yellow-action px-4 fw-bold">Apply for Leave</button>
        </div>
      </div>
    </div>
  );
};

export default LeavePage;
