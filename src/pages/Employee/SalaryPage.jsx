import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './css/salary.css';
import { useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';
import api from '../../hooks/api';
import CheckEmpty from '../../hooks/useEmpty';
const SalaryPage = () => {

  const {user} = useContext(AuthContext); //global variable for auth user
  //empty 
  const [empty] = useState('is empty');
  const [ety, setEty] = useState(false);
  // salary details
  const [salary, setSalary] = useState([]);
  // total salary
  const [totalsalary, setTotalsalary] = useState([]);

  //get function
  async function getEmpSalary() {
    try{
      const res = await axios.get(`${api}/payslip/${user.name}`, {withCredentials:true});
      setTotalsalary(res.data.totalsalry);
      setSalary(res.data.payslip);
    }catch(err){
      console.log(err);
    }
  };

  useEffect(()=>{
    getEmpSalary()//call
    CheckEmpty(salary, setEty);
  }, []); // first time only 

  useEffect(()=>{
    getEmpSalary()//call
    CheckEmpty(salary, setEty);
  }, [salary]); // every time change salary value 
  


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
                <th className=' bg-primary text-light'>MONTH</th>
                <th className=' bg-primary text-light'>BASIC PAY</th>
                <th className=' bg-primary text-light'>HRA</th>
                <th className=' bg-primary text-light'>OTHER ALLOWANCES</th>
                <th className=' bg-primary text-light'> DEDUCTIONS </th>
                <th className=' bg-primary text-light'>NET SALARY</th>
                <th className=' bg-primary text-light'>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              { salary && salary.map((item, index) => (
                <tr key={index}>
                  <td className="fw-bold text-muted">{item.month}</td>
                  <td>${item.basic}</td>
                  <td>${item.hra}</td>
                  <td style={{width:"15%", whiteSpace:"nowrap"}}>${item.other}</td>
                  <td>${item.deduct}</td>
                  <td className="fw-bold text-dark">${item.net}</td>
                  <td>
                    <button className="btn btn-view-custom btn-sm px-4" style={{backgroundColor:item.status == 'Paid' ? "green" : "orange"}}>{item.status}</button>
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
          salary.length > 4 &&
            <div className="text-end mt-1">
              { !ety && 
                <button className="btn btn-yellow-action px-4 py-2 fw-bold shadow-sm">
                  View All Payslips
                </button>
              }
            </div>
        }
      </div>
    </div>
  );
};

export default SalaryPage;
