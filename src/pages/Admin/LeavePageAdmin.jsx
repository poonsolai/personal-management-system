import { useState, useEffect} from 'react';
import './css/leaveAdmin.css'
import HideData from '../../hooks/useHideData';
import axios from 'axios';
import api from '../../hooks/api';
import CheckEmpty from '../../hooks/useEmpty';
const LeavePageAdmin = () => {


  //get all leaves in database
  async function loadLeaves() {
    const res = await axios.get(`${api}/admin/leave`, {withCredentials:true});
    // if(res.data.leaves.length == 0){
    //   setEmpty("Leave Request is Empty");
    //   setEty(true);
    //   return;
    // }
    setLeaveData(res.data.leaves.reverse());
    // setEty(false);
  }
  // state variavle for leavedata
  let [leaveData, setLeaveData] = useState([]);
  //empty 
  const [empty, setEmpty] = useState('Leave Request is Empty');
  const [ety, setEty] = useState(false);

  let pending = leaveData.filter((a)=>a.status === 'Pending');
  let rejected = leaveData.filter((a)=>a.status === 'Rejected');
  let approved = leaveData.filter((a)=>a.status === 'Approved');

   useEffect(()=>{
    loadLeaves();//call 
    CheckEmpty(leaveData, setEty); 
  },[]);

   useEffect(()=>{
      CheckEmpty(leaveData, setEty);  
  }, [leaveData]);
  
  // using custom hook for hide and view a dats
  const [num, viewAll, HideAll] = HideData(leaveData);
  //approve function
  async function approvedFunc(id, action){
    let res = await axios.patch(`${api}/admin/leave/${id}`,{action:action}, {withCredentials:true});
    if(res.data.success){
      loadLeaves();
    }
  }
  // reject function
  async function rejectedFunc(id, action){
    let res = await axios.patch(`${api}/admin/leave/${id}`,{action:action}, {withCredentials:true});
    if(res.data.success){
      loadLeaves();
    }
  }


  return (
    <div className="container-fluid p-4 dashboard-bg mt-3">
      <h2 className="mb-4 fw-bold">Leave Management</h2>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mt-2 mt-md-0">
          <div className="card stat-card pending text-white">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-0">Pending Leave Requests</p>
                <h3>{pending.length}</h3>
              </div>
              <i className="bi bi-clock-history fs-1 opacity-50"></i>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-2 mt-md-0">
          <div className="card stat-card approved text-white">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-0">Approved Leave Requests</p>
                <h3>{approved.length}</h3>
              </div>
              <i className="bi bi-check-circle fs-1 opacity-50"></i>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-2 mt-md-0">
          <div className="card stat-card rejected text-white">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-0">Rejected Leave Requests</p>
                <h3>{rejected.length}</h3>
              </div>
              <i className="bi bi-x-circle fs-1 opacity-50"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0">Leave Requests</h5>
          {/* view data btn */}
            {
              leaveData.length > 4 && 
              <div className="view">
                {
                  num == 4 ? <button className='btn btn-secondary px-3' onClick={viewAll}>View all</button> : <button className='btn btn-secondary px-3' onClick={HideAll}>Hide</button>
                }    
              </div>
            }
            
        </div>
        {/* view data btn */}
        
        <div className="table-responsive table-bordered table-hover p-2">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className=' bg-secondary text-light'>Employee</th>
                {/* <th>Leave Type</th> */}
                <th className=' bg-secondary text-light'>From Date</th>
                <th className=' bg-secondary text-light'>To Date</th>
                <th className=' bg-secondary text-light'>Reason</th>
                <th className=' bg-secondary text-light'>Status</th>
                <th className=' bg-secondary text-light'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveData && leaveData.slice(0,num).map((item) => (
                <tr key={item._id}>
                  <td>{item.employee}</td>
                  <td>{item.fromDate}</td>
                  <td>{item.toDate}</td>
                  <td>{item.reason}</td>
                  <td>
                    <span className={`badge ${item.status === 'Approved' ? 'bg-success-light text-success p-2' : item.status === 'Pending' ? 'bg-warning-light text-warning p-2' : 'bg-warning-light text-danger  p-2'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {
                      item.status === 'Pending' ? 
                      <div>
                        <button className="btn btn-success btn-sm me-2 mt-2 " onClick={()=>approvedFunc(item._id, "Approved")}>Approve</button>
                        <button className="btn btn-danger btn-sm mt-2 "  onClick={()=>rejectedFunc(item._id, "Rejected")} >Reject</button>
                      </div> :
                      <button  className={`${item.status === 'Approved' ? "btn btn-success btn-sm px-4" :"btn btn-danger btn-sm px-4"}`} disabled >{item.status}</button>
                    }
                    
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
      </div>
    </div>
  );
};

export default LeavePageAdmin;
