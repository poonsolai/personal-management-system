import './css/task.css';

const TaskPage = () => {
  const tasks = [
    { name: "Bug Fixing", by: "Admin", status: "In Progress", date: "2024-05-09" },
    { name: "Feature Progress", by: "Admin", status: "In Progress", date: "2024-05-09" },
    { name: "Interface Improvement", by: "Sarah Lee", status: "Pending", date: "2024-05-14" },
    { name: "Website Update", by: "John Doe", status: "Pending", date: "2024-05-13" },
    { name: "Website Migrations", by: "John Doe", status: "Pending", date: "2024-05-13" },
  ];

  return (
    <div className="container-fluid py-4 task-page">
      <h2 className="mb-4 fw-bold page-title">My Tasks</h2>

      {/* Stat Cards Row */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-md-4">
          <div className="stat-card blue-gradient shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1 opacity-75">Active Tasks</p>
                <h2 className="display-5 fw-bold mb-0">5</h2>
              </div>
              <div className="icon-overlay">✓</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card orange-gradient shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1 opacity-75">Completed Tasks</p>
                <h2 className="display-5 fw-bold mb-0">8</h2>
              </div>
              <div className="icon-overlay">≣</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card green-gradient shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1 opacity-75">Task Completion Rate</p>
                <h2 className="display-5 fw-bold mb-0">62<span className="h4">%</span></h2>
              </div>
              <div className="icon-overlay">◔</div>
            </div>
          </div>
        </div>
      </div>

      {/* Task List Card */}
      <div className="card border-0 shadow-sm task-container p-4">
        <h4 className="mb-4 fw-bold">My Tasks</h4>
        <div className="table-responsive">
          <table className="table align-middle custom-task-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Assigned By</th>
                <th>Status</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className="fw-bold">{task.name}</td>
                  <td>{task.by}</td>
                  <td>
                    <span className={`status-pill ${task.status.toLowerCase().replace(" ", "-")}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="text-muted">{task.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-end mt-4">
          <button className="btn btn-yellow-action px-5 py-2 fw-bold shadow-sm">
            View All Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
