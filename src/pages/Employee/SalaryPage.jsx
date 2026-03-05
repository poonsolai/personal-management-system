import './css/salary.css'

const SalaryPage = () => {
  const payslips = [
    { month: "April 2024", basic: "$3,500", hra: "$1,500", other: "$400", deduct: "$400", net: "$5,000" },
    { month: "March 2024", basic: "$3,500", hra: "$1,500", other: "$400", deduct: "$400", net: "$5,000" },
    { month: "February 2024", basic: "$3,500", hra: "$1,500", other: "$400", deduct: "$400", net: "$5,000" },
    { month: "January 2024", basic: "$3,500", hra: "$1,500", other: "$400", deduct: "$400", net: "$5,000" },
  ];

  return (
    <div className="container py-4 salary-page">
      <h2 className="mb-4 fw-bold page-title">My Salary</h2>

      {/* Annual Salary Highlight Card */}
      <div className="card annual-salary-card border-0 shadow-sm mb-5 p-4 text-white">
        <div className="card-body">
          <p className="card-subtitle mb-2 opacity-75">Annual Salary</p>
          <h1 className="display-4 fw-bold">$50,000</h1>
          {/* Background Decor */}
          <div className="salary-icon-bg">$</div>
        </div>
      </div>

      {/* Recent Payslips Table */}
      <div className="card border-0 shadow-sm p-4 table-card">
        <h4 className="mb-4 fw-bold text-dark">Recent Payslips</h4>
        <div className="table-responsive">
          <table className="table custom-salary-table align-middle">
            <thead>
              <tr>
                <th>Month</th>
                <th>Basic Pay</th>
                <th>HRA</th>
                <th>Other Allowances</th>
                <th>Deductions</th>
                <th>Net Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payslips.map((item, index) => (
                <tr key={index}>
                  <td className="fw-bold text-muted">{item.month}</td>
                  <td>{item.basic}</td>
                  <td>{item.hra}</td>
                  <td>{item.other}</td>
                  <td>{item.deduct}</td>
                  <td className="fw-bold text-dark">{item.net}</td>
                  <td>
                    <button className="btn btn-view-custom btn-sm px-4">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-end mt-3">
          <button className="btn btn-yellow-action px-4 py-2 fw-bold shadow-sm">
            View All Payslips
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalaryPage;
