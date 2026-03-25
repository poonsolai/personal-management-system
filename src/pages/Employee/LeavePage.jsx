import './css/leave.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEllipsis, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {LeaveContext} from '../../context/LeaveContext';
import useForm from '../../hooks/useForm';

const LeavePage = () => {
  //total balance leavecount
  const {totalleave, CalLeave} = useContext(LeaveContext);
  //leave 
  const [leaves, setLeaves] = useState([]);
  // user 
  const {user} = useContext(AuthContext);
  // show
  const [show, setShow] = useState(false);
  // message
  const [message, setMessage] = useState("");
  // use custom hook useing for form
  const {val, handleForm, ClearForm} = useForm({employee:user.name, fromDate:"", toDate:"", reason:"", status: "Pending"});
  //empty 
  const [empty, setEmpty] = useState('');
  const [ety, setEty] = useState(false);

  CalLeave(leaves.length);

  // get leaves in database 
  async function getLeave() {
    try{
      let res = await axios.get(`https://personal-management-system-backend.onrender.com/employee/leave/${user.name}`, {withCredentials:true});
      if(res.data.success){
        setEty(false);
        setLeaves(res.data.leaves.reverse());
        return ;
      }else{
        setEmpty(res.data.message);
        setLeaves(res.data.leaves);
        setEty(true);
      }
    }catch(err){
      console.log(err);
    }
  }
  // run first time only
  useEffect(()=>{
    getLeave()//call
  }, []);
  // show form
  function SendRequestForm(){
    setShow(!show);
  }
   // cancel form
  function CancelForm(){
    setShow(false);
  }
  //send leave request
  async function SendRequest(e) {
    try{
      e.preventDefault() // this is used to don't reload a page
      if(val.employee,val.fromDate,val.toDate,val.reason == ''){
        return alert("please all fields...")
      }
      let res = await axios.post("https://personal-management-system-backend.onrender.com/employee/leave", val, {withCredentials:true});
      if(res.data.success){
          ClearForm();
          setShow(false);
          setMessage(res.data.message);
          getLeave();//
      }else{
        setShow(true);
        setMessage(res.data.message);
        set
      }
      
      }catch(err){
        console.log(err);
    }
  }
  // cancel a leave request 
  async function deleteRequest(id){
    getLeave()
    if(confirm("cancel your leave request ..")){
      try{
      let res = await axios.delete(`https://personal-management-system-backend.onrender.com/employee/leave/${id}`, {withCredentials:true});
        setMessage(res.data.message);
        CalLeave(leaves.length);//
        getLeave();//
      }catch(err){
        console.log(err);
      }
    }

  }
  return (
    <div className="container-fluid py-4 leave-page px-4">
      <h2 className="mb-4 fw-bold page-title">My Leaves</h2>

      {/* Info Cards Row */}
      <div className="row g-3 mb-5">
        <div className="col-12 col-md-4">
          <div className="stat-card orange-card shadow-sm">
            <p>Leave Balance</p>
            <h3>{totalleave} <span>Days</span></h3>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card green-card shadow-sm">
            <p>Approved Leave Days</p>
            <h3>{leaves && leaves.filter((l)=>l.status.toLowerCase() == "approved").length} <span>Days</span></h3>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card blue-card shadow-sm">
            <p>Pending Leave Days</p>
            <h3>{leaves && leaves.filter((l)=>l.status.toLowerCase() == "pending").length} <span>Days</span></h3>
          </div>
        </div>
      </div>

      {/* Requests Table Section */}
      <div className="card border-0 shadow-sm table-container p-4">
        <h4 className="mb-4 fw-bold">My Leave Requests</h4>
        
        <div className="d-flex justify-content-start mb-3">
          <button className="btn btn-dark btn-new-request" onClick={SendRequestForm}>
            <FontAwesomeIcon icon={faPlus} className="me-2" /> New Leave Request
          </button>
        </div>
        <p className='message'>{message}</p>
        {/* new leave request */}
        {
        show && 
        <div className="form container-fluid bg-black text-light mb-5" id='show-form'>
          <form className='row' >
          
            <div className='col-md-6'>
              <label htmlFor="task"> FromDate </label>
              <input type="text" className=' form-control' name='fromDate' value={val.fromDate} onChange={handleForm} placeholder='Jan 30-2026' required/>
            </div>
            <div className='col-md-6'>
              <label htmlFor="deadline"> ToDate </label>
              <input type="text" className=' form-control' name='toDate' value={val.toDate} onChange={handleForm} placeholder='Jan 31-2026' required/>
            </div>
            <div className='col-md-6'>
              <label htmlFor="status" className='pb-1'> Reason </label>
              <input name="reason"  className=' form-control mt-2 ' value={val.reason}  onChange={handleForm} placeholder='reason'></input>
            </div>
            <div className="col-md-12" id='btn'>
              {
                <button className='btn btn-success px-5 py-2' onClick={SendRequest}>Send Request</button> 
              }
              <button className='btn btn-danger px-5 py-2' onClick={CancelForm}>Cancel</button>
            </div>
          </form>
          
        </div>
      }
        <div className="table-responsive table-bordered table-hover ">
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
              { leaves &&
                leaves.map((leave)=>(
                  <tr key={leave.id}>
                    <td>{leave.fromDate} - {leave.toDate}</td>
                    <td>{leave.reason}</td>
                    <td>
                      <span className={`badge ${leave.status === 'Approved' ? 'bg-success-light text-success p-2' : leave.status === 'Pending' ? 'bg-warning-light text-warning p-2' : 'bg-warning-light text-danger  p-2'}`}>
                        {leave.status}
                      </span>
                    </td>
                    {
                      leave.status == "Approved" || leave.status == "Rejected"? <td> <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon></td> : <td><span className='badge bg-danger px-3 py-2 cursor-pointer' onClick={()=>{deleteRequest(leave._id)}}>cancel</span></td>
                    }
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
    </div>
  );
};

export default LeavePage;
