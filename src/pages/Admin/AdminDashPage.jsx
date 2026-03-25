import '../../css/dashbord.css'
import { useContext } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';

const AdminDashboard = () => {
  const [length, setlength] = useState(0);
  //create local storage

  async function AllDatas() {
    const res = await axios.get("https://personal-management-system-backend.onrender.com/admin/dashbord", {withCredentials:true});
    setlength(res.data.tasklength); // task total length 
    setAll({employees:res.data.employees, leaves:res.data.leaves, tasks:res.data.tasks});
  };
  
  useEffect(()=>{
    AllDatas()//call
  }, []);

   const [all, setAll] = useState({employees:"", leaves:"", tasks:"",tlength:''})
 
   let percentage = (Number(all.tasks.length)/Number(length))*100;
   
   let monthlypayout = 0;

   for(let i of all.employees){

    monthlypayout += Number(i.salary);

   }
   


  return (
    <div className="container-fuild px-4 mt-3 py-4">
      <h2 className="fw-bold mb-4">Welcome Admin! </h2>
      
      {/* Top Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-primary text-white p-3 dash-card">
            <p className="mb-1">Total Employees</p>
            <h1 className="fw-bold">{all.employees.length}</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-orange text-white p-3 dash-card">
            <p className="mb-1">Active Tasks</p>
            <h1 className="fw-bold">{all.tasks.length}</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-success text-white p-3 dash-card">
            <p className="mb-1">Pending Leave Requests</p>
            <h1 className="fw-bold">{all.leaves.length}</h1>
          </div>
        </div>
      </div>

     

      {/* Quick Stats Section */}
      <h5 className="fw-bold mb-3">Quick Stats</h5>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-4 d-flex flex-row align-items-center justify-content-between">
            <div><p className="text-muted mb-0">Monthly Payroll:</p><h3 className="text-primary fw-bold">${monthlypayout}</h3></div>
            <i className="bi bi-wallet2 fs-1 text-primary opacity-50"></i>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-4 d-flex flex-row align-items-center justify-content-between">
            <div><p className="text-muted mb-0">Completed Tasks</p><h3 className="text-danger fw-bold">{percentage.toFixed(0)}%</h3></div>
            <i className="bi bi-graph-up fs-1 text-danger opacity-50"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
