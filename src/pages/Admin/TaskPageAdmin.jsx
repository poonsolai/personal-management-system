import './css/taskAdmin.css';
const TaskManager = () => {
  const tasks = [
    { id: 1, task: 'Website Update', assigned: 'John Doe', status: 'Pending', deadline: '2024-05-10' },
    { id: 2, task: 'Database Backup', assigned: 'Emily Smith', status: 'In Progress', deadline: '2024-05-07' },
    { id: 3, task: 'Feature Development', assigned: 'Karthick Kumar', status: 'Completed', deadline: '2024-05-01' },
    { id: 4, task: 'Employee Training', assigned: 'Alex Johnson', status: 'Pending', deadline: '2024-05-09' },
    { id: 5, task: 'Bug Fixing', assigned: 'John Doe', status: 'In Progress', deadline: '2024-04-30' },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'In Progress': return 'status-progress';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  return (
    <div className="container mt-5 task-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Tasks</h2>
        <button className="btn btn-primary px-4 add-task-btn">Add Task</button>
      </div>

      {/* Filters Section */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <select className="form-select border-0 shadow-sm py-2">
            <option>All Statuses</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select border-0 shadow-sm py-2">
            <option>All Employees</option>
          </select>
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control border-0 shadow-sm py-2" placeholder="Search" />
        </div>
      </div>

      {/* Tasks Table */}
      <div className="card border-0 shadow-sm p-3">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="text-secondary small">
              <tr>
                <th>Task</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id}>
                  <td className="fw-medium">{t.task}</td>
                  <td>{t.assigned}</td>
                  <td>
                    <span className={`badge-custom ${getStatusClass(t.status)}`}>
                      {t.status}
                    </span>
                  </td>
                  <td>{t.deadline}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2 px-3">Edit</button>
                    <button className="btn btn-danger btn-sm px-2">
                        <i className="bi bi-trash"></i> 🗑️
                    </button>
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

export default TaskManager;
