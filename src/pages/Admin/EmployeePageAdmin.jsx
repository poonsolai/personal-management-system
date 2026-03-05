import './css/employeeAdmin.css';

const EmployeeList = () => {
  const employees = [
    { name: 'John Doe', email: 'john@mail.com', role: 'Developer', dept: 'Development', salary: '$60,000', date: '2022-01-15' },
    { name: 'Emily Smith', email: 'emily@mail.com', role: 'HR Manager', dept: 'HR', salary: '$55,000', date: '2021-05-10' },
    { name: 'Alex Johnson', email: 'alex@mail.com', role: 'Developer', dept: 'Development', salary: '$65,000', date: '2023-08-25' },
    { name: 'Lisa Wong', email: 'lisa@mail.com', role: 'Marketing Specialist', dept: 'Marketing', salary: '$62,000', date: '2020-11-18' },
    { name: 'Karthick Kumar', email: 'karthick@mail.com', role: 'Developer', dept: 'Development', salary: '$60,000', date: '2023-02-10' },
  ];

  const departments = ['All', 'HR', 'Development', 'Marketing', 'Sales'];

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Employees</h2>
        <button className="btn btn-primary px-4 add-emp-btn">Add Employee</button>
      </div>

      <div className="search-section mb-4">
        <div className="input-group mb-3 shadow-sm">
          <span className="input-group-text bg-white border-0"><i className="bi bi-search"></i> 🔍</span>
          <input type="text" className="form-control border-0 py-2" placeholder="Search" />
        </div>

        {/* Tab Filters */}
        <div className="d-flex gap-3 border-bottom pb-2">
          {departments.map((dept, index) => (
            <button key={index} className={`btn btn-link text-decoration-none dept-tab ${index === 0 ? 'active' : ''}`}>
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Employee Table */}
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table mb-0 table-hover align-middle">
            <thead className="table-light text-muted">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Joining Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, i) => (
                <tr key={i}>
                  <td className="fw-semibold">{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>{emp.dept}</td>
                  <td>{emp.salary}</td>
                  <td>{emp.date}</td>
                  <td className="text-center">
                    <button className="btn btn-primary btn-sm me-2 px-3">Edit</button>
                    <button className="btn btn-danger btn-sm">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-end mt-4">
        <nav>
          <ul className="pagination pagination-sm">
            <li className="page-item"><a className="page-link text-dark" href="#">Previous</a></li>
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link text-dark" href="#">2</a></li>
            <li className="page-item"><a className="page-link text-dark" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default EmployeeList;
