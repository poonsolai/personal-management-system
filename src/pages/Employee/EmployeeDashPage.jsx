import '../../css/dashbord.css'
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {LeaveContext} from '../../context/LeaveContext'
const EmployeeDashboard = () => {

  const {user} = useContext(AuthContext); //global variable for auth user
  const {totalleave, CalLeave} = useContext(LeaveContext); // total leaves 
  // empty 
  const [empty, setEmpty] = useState('is empty');
  const [ety, setEty] = useState(false);
  const [etyl, setEtyl] = useState(false);
  //check employee
  const [checkemp, setCheckemp] = useState('');
  const [check, setCheck] = useState(false);
  // userdeails 
  const [employee, setEmployee] = useState({})
  const [userdetails, setUserdetails] = useState({task:"", leave:""});
  // destructre data
  const {task} = userdetails;
  const leaves = userdetails.leave;
  CalLeave(leaves.length); // total leave calculate
  // check employee function
  async function checkEmployee() {
    let res = await axios.get(`https://personal-management-system-backend.onrender.com/employee/dashbord/${user.name}/${user.email}`, {withCredentials:true});
    if(!res.data.success){
      setCheck(true);
      setCheckemp(res.data.message);
      return;
    }
    setCheck(false);
    setEmployee(res.data.user);
  }

  // get all details in this employee
  async function getAllDetails() {
    let res = await axios.get(`https://personal-management-system-backend.onrender.com/employee/dashbord/${user.name}`, {withCredentials:true});
    // if(res.data.tasks.length == 0){
    //   // setEmpty(res.data.message);
    //   // setEty(true);
    //   setUserdetails({...userdetails, leave : res.data.leaves.reverse()});
    //   return;
    // }
    // if(res.data.leaves.length == 0){
    //   setEmpty(res.data.message);
    //   setEtyl(true);
    //   setUserdetails({...userdetails, task : res.data.tasks.reverse()});
    //   return;
    // }
    // setEtyl(false);
    // setEty(false);
    setUserdetails({...userdetails, task : res.data.tasks.reverse(), leave : res.data.leaves.reverse()});
  }
  //first time run the code
  useEffect(()=>{
    checkEmployee();//
    getAllDetails();//
    // ckeck leaves empty or not
    if(leaves.length == 0){
      setEtyl(true);
    }else{
      setEtyl(false);
    }
    // ckeck task empty or not
    if(task.length == 0){
      setEty(true);
    }else{
      setEty(false);
    }
  }, [task, leaves]);

 const getStatusClass = (status) => {
    switch (status.toUpperCase()) {
      case 'PENDING': return 'status-pending';
      case 'IN PROGRESS': return 'status-progress';
      case 'COMPLETED': return 'status-completed';
      default: return ''; 
    }
  };

  return (
    <div className="container-fulid py-4 px-4">
      {
        check && 
        <div className='checkemp mb-3'>
          <p className='msg'>{checkemp}</p>
          <p className='cancel' onClick={()=>{setCheck(false);}}>x</p>
      </div>
      }
      <h2 className="fw-bold mb-4">Hello {user.name}!</h2>
      
      {/* Top Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-primary text-white p-3 dash-card">
            <p className="mb-1">My Tasks</p>
            <h1 className="fw-bold">{userdetails.task.length}</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-orange text-white p-3 dash-card">
            <p className="mb-1">Leave Balance</p>
            <h1 className="fw-bold">{totalleave} Days</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-success text-white p-3 dash-card">
            <p className="mb-1">My Salary</p>
            <h1 className="fw-bold">${employee.salary}</h1>
          </div>
        </div>
      </div>

      {/* My Tasks Section */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="p-3 d-flex justify-content-between ">
          <h5 className="mb-0 fw-bold">My Tasks</h5>
          <button className="btn btn-primary btn-sm px-3" disabled>Last Two Tasks</button>
        </div>
        <div className="table-responsive table-bordered table-hover p-2">
          <table className="table mb-0 " >
          <thead className="table-light">
            <tr><th>Task</th><th>Status</th><th>Deadline</th></tr>
          </thead>
          <tbody>
            
              { task &&
                task.slice(0, 2).map((task)=>(
                  <tr key={task._id}>
                    <td >{task.task}</td>
                    <td > <span id={getStatusClass(task.status)} className={`badge-custom py-1`}>{task.status}</span></td>
                    <td >{task.deadline}</td>
                  </tr>
                  
                ))
              }
            
          </tbody>
        </table>
          { ety &&
            <p className=' bg-secondary-subtle p-4 text-center text-danger mt-3'>
              {empty}
            </p>
          }
        </div>
      </div>

      {/* My Leave Requests Section */}
      <div className="card shadow-sm border-0">
        <div className="p-3 d-flex justify-content-between">
          <h5 className="mb-0 fw-bold">My Leave Requests</h5>
          <button className="btn btn-primary btn-sm px-3" disabled>Last Two Leaves</button>
        </div>
       <div className=' table-bordered table-hover table-responsive p-2 '>
         <table className="table mb-0">
          <thead className="table-light">
            <tr><th>From - To</th><th>Reason</th><th>Status</th></tr>
          </thead>
          <tbody>

            { leaves &&
                leaves.slice(0, 2).map((l)=>(
                  <tr key={l._id}>
                    <td >{l.fromDate} - {l.toDate}</td>
                    <td >{l.reason}</td>
                    <td > <span className={`badge-custom py-1 ${l.status.toLowerCase() == 'approved' ? 'bg-success-subtle text-success px-2 py-1' : 'bg-danger-subtle text-danger px-2 py-1'} `} >{l.status}</span></td>
                  </tr>
                  
                ))
              }
          </tbody>
        </table>
       </div>
          { etyl &&
            <p className=' bg-secondary-subtle p-4 text-center text-danger mt-3'>
              {empty}
            </p>
          }
      </div>
    </div>
  );
};

export default EmployeeDashboard;
