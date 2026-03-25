import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './css/salary.css';
import { useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';

const SalaryPage = () => {

  const {user} = useContext(AuthContext); //global variable for auth user
  //empty 
  const [empty, setEmpty] = useState('');
  const [ety, setEty] = useState(false);
  // salary details
  const [salary, setSalary] = useState([]);
  // total salary
  const [totalsalary, setTotalsalary] = useState([]);
  //get function
  async function getEmpSalary() {
    const res = await axios.get(`https://personal-management-system-backend.onrender.com/payslip/${user.name}`, {withCredentials:true});
    if(!res.data.success){
      setEmpty(res.data.message);
      setTotalsalary(res.data.totalsalry);
      setEty(true);
      return; 
    }
    setEty(false);
    setTotalsalary(res.data.totalsalry);
    setSalary(res.data.payslip);
  };

  useEffect(()=>{
    getEmpSalary()//call
  }, []);
  


  return (
    <div className="container-fulid py-4 salary-page px-4">
      <h2 className="mb-4 fw-bold page-title">My Salary</h2>

      {/* Annual Salary Highlight Card */}
      <div className="card annual-salary-card border-0 shadow-sm mb-5 p-4 text-white">
        <div className="card-body">
          <p className="card-subtitle mb-2 opacity-75">Annual Salary</p>
          <h1 className="display-4 fw-bold">${totalsalary}</h1>
          {/* Background Decor */}
          <div className="salary-icon-bg">$</div>
        </div>
      </div>

      {/* Recent Payslips Table */}
      <div className="card border-0 shadow-sm p-4 table-card">
        <h4 className="mb-4 fw-bold text-dark">Recent Payslips</h4>
        <div className="table-responsive table-bordered table-hover">
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
              { salary && salary.map((item, index) => (
                <tr key={index}>
                  <td className="fw-bold text-muted">{item.month}</td>
                  <td>${item.basic}</td>
                  <td>${item.hra}</td>
                  <td>${item.other}</td>
                  <td>${item.deduct}</td>
                  <td className="fw-bold text-dark">${item.net}</td>
                  <td>
                    <button className="btn btn-view-custom btn-sm px-4">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          { ety &&
            <p className=' bg-secondary-subtle p-4 text-center text-danger mt-3'>
              {empty}
            </p>
          }
        </div>
        {
          !ety && 
            <div className="text-end mt-1">
              <button className="btn btn-yellow-action px-4 py-2 fw-bold shadow-sm">
                View All Payslips
              </button>
            </div>
        }
      </div>
    </div>
  );
};

export default SalaryPage;
