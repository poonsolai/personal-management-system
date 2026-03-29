import './css/taskAdmin.css';
import { useState } from 'react';
import useForm from '../../hooks/useForm';
import useHideData from '../../hooks/useHideData';
import axios from 'axios'
import { useEffect } from 'react';
import api from '../../hooks/api';
import checkEmpty from '../../hooks/useEmpty.js';
const TaskManager = () => {
  // get all employees
  async function employee() {
      const res = await axios.get(`${api}/admin/emp/users`, {withCredentials:true});
      setEmployees(res.data.users);
    }
  async function gettasks() {
    let res =await axios.get(`${api}/admin/task/`, {withCredentials:true});
    setTasks(res.data.tasks.reverse());
  }
  useEffect(()=>{
    // employee()// employee get function
  },[]);

  //employess
  const [employees, setEmployees] = useState([]);
  // message handle State
  const [message, setMessage] = useState('')
  //add task use pannura state variable
  const [show, setShow] = useState(false);
  //tasks data use pannura state variable
  const [tasks, setTasks] = useState([]);
  //useing a custom hook for form
  const {val, handleForm, ClearForm, setVal} = useForm({task:"",assign_to:"",status:"",deadline:""});
  // using custom hook for hide and view a dats
  const [num, viewAll, HideAll] = useHideData(tasks);
  // search state variable
  const [searchvariable, setSearchvariable] = useState({status:"All", employee:"All"});
    // ithu add or update pannuroma nu find panni athuku ethmari btns and form ah correct panna use pannurom
  const [update, setUpdate] = useState(false);
  //empty 
  const [empty, setEmpty] = useState('is empty');
  const [ety, setEty] = useState(false);


  const getStatusClass = (status) => {
    switch (status.toUpperCase()) {
      case 'PENDING': return 'status-pending';
      case 'IN PROGRESS': return 'status-progress';
      case 'COMPLETED': return 'status-completed';
      default: return '';
    }
  };

  //Show Add task form 
  function ShowAddTaskForm(){
    setShow((show)=> {return !show});
    setUpdate(false);
  }
  //Cancel Task form
  function CancelTaskForm(){
    setShow(false);
    setUpdate(false);
    ClearForm();
  } 

  //AddedTask function
  async function AddedTask(e){
    try{
      e.preventDefault() // this is used to don't reload a page
      if(val.task,val.assign_to,val.status,val.deadline == ''){
        return alert("please all fields...")
      }
      let res = await axios.post(`${api}/admin/task/new`, val, {withCredentials:true});
      if(res.data.success){
          ClearForm();
          setShow(false);
          setMessage(res.data.message);
          gettasks();//
        
      }else{
        setShow(true);
        setMessage(res.data.message);
      }
      
      }catch(err){
        console.log(err)
    }
  }
  //edit employee function
  function editEmp(task){
    setUpdate(true);
    setShow(true);
    setVal(task);
  }
  //update function
  async function updateSTatus(e){
    e.preventDefault() // this is used to don't reload a page
    try{
      let res = await axios.put(`${api}/admin/task/${val._id}`, val, {withCredentials:true});
      setMessage(res.data.message);
      gettasks()// update the updated value in show in ui
      ClearForm()// clear the previce data
    }catch(err){
      console.log(err);
    }finally{
      setShow(false);
    }
  }
  // dynamic search for employee
  async function TaskSearchFun(e){
    const {value, name} = e.target
    setSearchvariable({...searchvariable, [name]:value});
  }

  useEffect(()=>{
    employee()// employee get function
    StatusSearchFun(); // search the task 
    checkEmpty(tasks, setEty);
  },[searchvariable.employee, searchvariable.status]) // first run and next this value change that time run this function

  useEffect(()=>{
      checkEmpty(tasks, setEty);  
  }, [tasks]);
  // dynamic search for status
  async function StatusSearchFun(){

    const res =await axios.get(`${api}/admin/task/${searchvariable.employee}/${searchvariable.status}`, {withCredentials:true});
      if(res.data.tasks.length == 0){
        setEty(true);
        setEmpty("Task Is Empty")
        setTasks(res.data.tasks);
        return;
      }
      if(res.data.success){
        setEty(false);
        return setTasks(res.data.tasks);
      }
  }

  //remove task function
  async function removeTask(id){
    if(confirm('Delete a task')){
      try{
        const res = await axios.delete(`${api}/admin/task/${id}`, {withCredentials:true});
        if(res.data.success){
            gettasks()//
        }
      }catch(err){
        console.log(err)
      }
    }
  }

  return (

    <div className="container-fuild mt-3 p-4 task-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Tasks</h2>
        <button className="btn btn-primary px-4 add-task-btn" onClick={ShowAddTaskForm}>Add Task</button>
      </div>

      {/* Filters Section */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <select className="form-select border-0 shadow-sm py-2" onChange={TaskSearchFun} name='status' value={searchvariable.status}>

            <option value={'All'}>All Statuses</option>
            <option value={'Pending'}>Pending</option>
            <option value={'In Progress'}>In Progress</option>
            <option value={'Completed'}>Completed</option>
            
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select border-0 shadow-sm py-2" onChange={TaskSearchFun} name='employee' value={searchvariable.employee}>
            <option value={'All'}>All Employees</option>
            {
              employees.map((val)=>(
                <option key={val.id} value={val.name}>{val.name}</option>
              ))
            }
          </select>
        </div>
       
      </div>
      <p className='message'>{message}</p>
      {/* view data btn */}
          {
            tasks.length > 4 ? 
            <div className="view">
            {
              num == 4 ? <button className='btn btn-secondary px-3' onClick={viewAll}>View all</button> : <button className='btn btn-secondary px-3' onClick={HideAll}>Hide</button>
            }    
          </div> : ""
          }

      {/* Add Tasks Form */}
      {
        show && 
        <div className="form container-fluid bg-black text-light mb-5" id='show-form'>
          <form className='row' >
            <div className='col-md-6'>
              <label htmlFor="assigned"> Assign To </label>
              <input type="text" className=' form-control' name='assign_to' id='assign' value={val.assign_to} onChange={handleForm} placeholder='employee name' required/>
            </div>
            <div className='col-md-6'>
              <label htmlFor="task"> Task </label>
              <input type="text" className=' form-control' name='task' value={val.task} onChange={handleForm} placeholder='task name' required/>
            </div>
            <div className='col-md-6'>
              <label htmlFor="deadline"> Deadline </label>
              <input type="text" className=' form-control' name='deadline' value={val.deadline} onChange={handleForm} placeholder='year-month-date' required/>
            </div>
            <div className='col-md-6'>
              <label htmlFor="status" className='pb-1'> Status </label>
              <select name="status"  className=' form-control mt-2 ' value={val.status}  onChange={handleForm}>
                <option value='Pending' defaultValue>Pending</option>
                <option value='In Progress' >In Progress</option>
                <option value='Completed' >Completed</option>
              </select>
            </div>
            <div className="col-md-12" id='btn'>
              {
                !update ? <button className='btn btn-success px-5 py-2' onClick={AddedTask}>Add Task</button> : <button className='btn btn-success px-5 py-2' onClick={updateSTatus}>Update Task</button>
              }
              <button className='btn btn-danger px-5 py-2' onClick={CancelTaskForm}>Cancel</button>
            </div>
          </form>
          
        </div>
      }


      {/* Tasks Table */}
      <div className="card border-0 shadow-sm ">
        <div className="table-responsive table-bordered table-hover p-2" >
          <table className="table align-middle">
            <thead className="text-secondary small">
              <tr>
                <th className=' bg-secondary text-light'>Task</th>
                <th className=' bg-secondary text-light'>Assigned To</th>
                <th className=' bg-secondary text-light'>Status</th>
                <th className=' bg-secondary text-light'>Deadline</th>
                <th className=' bg-secondary text-light'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks && tasks.slice(0, num).map((t) => (
                <tr key={t.id}>
                  <td className="fw-medium">{t.task}</td>
                  <td>{t.assign_to}</td>
                  <td  >
                    <span className={`badge-custom ${getStatusClass(t.status)}`}>
                      {t.status}
                    </span>
                  </td>
                  <td>{t.deadline}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2 px-3" onClick={()=>{editEmp(t)}} disabled={t.status == "Completed"}>Edit</button>
                    <button className="btn btn-danger btn-sm px-2" onClick={()=>{removeTask(t._id)}}>
                        <i className="bi bi-trash"></i> 🗑️
                    </button>

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

export default TaskManager;
