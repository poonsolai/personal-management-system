import { useState } from 'react';
import './css/employeeAdmin.css';
import useHideData from '../../hooks/useHideData';
import useForm from '../../hooks/useForm';
import { useEffect } from 'react';
import axios from 'axios';
import { faL } from '@fortawesome/free-solid-svg-icons';
import api from '../../hooks/api';
import CheckEmpty from '../../hooks/useEmpty.js';

const EmployeeList = () => {
  
  // employee data va database la irundhu edukurom
  async function employee() {
    const res = await axios.get(`${api}/admin/emp/users`,{withCredentials:true});
    setEmployees(res.data.users.reverse());
  }
  // ithu add or update pannuroma nu find panni athuku ethmari btns and form ah correct panna use pannurom
  const [update, setUpdate] = useState(false);

  const departments = ['All', 'HR', 'Development', 'Marketing', 'Sales'];
  // emp data store in state variable 
  const [employees, setEmployees] = useState([]);
  // custom hook for hide and show datas
  const [num, viewAll, HideAll] = useHideData(employees);
  //add task use pannura state variable
  const [show, setShow] = useState(false);
  //useing a custom hook for form
  const {val, handleForm,ClearForm, setVal} = useForm({name:"",email:"",role:"",department:"HR",date:""}); 
  //empty 
  const [empty, setEmpty] = useState('is empty');
  const [ety, setEty] = useState(false);
  //
  useEffect(()=>{
    employee();//call
    CheckEmpty(employees, setEty);
  },[]);

  useEffect(()=>{
    CheckEmpty(employees, setEty);
  },[employees]);

  // message
  const [message, setMessage] = useState('');
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
  async function addEmp(e){
    e.preventDefault() // this is used to don't reload a page
    if(val.name == "" || val.email == "" || val.role == "" || val.department == ""  ){
      return alert("Fill The All Fields")
    }

    try{
      let res = await axios.post(`${api}/admin/emp/user`, val, {withCredentials:true});
      setMessage(res.data.message);
      employee()// update the edited value in show in ui
      if(res.data.success){
        setShow(false);
        ClearForm()// clear the previce data
      }else{
        setShow(true);
      }
    }catch(err){
      console.log(err);
    }
    
  }

  //remove employee function
  async function removeEmp(id){
    if(confirm("Delete employee ?")){
      try{
        const res = await axios.delete(`${api}/admin/emp/user/${id}`, {withCredentials:true});
        setMessage(res.data.message);
        employee()// update the removed value in show in ui
      }catch(err){
        console.log(err)
      }
    }
  }
  //edit employee function
  function editEmp(emp){
    setUpdate(true);
    setShow(true);
    setVal(emp);
  }
  //update function
  async function updateEmp(e){
    e.preventDefault() // this is used to don't reload a page
    try{
      let res = await axios.put(`${api}/admin/emp/user/${val._id}`, val, {withCredentials:true});
      setMessage(res.data.message);
      employee()// update the updated value in show in ui
      ClearForm()// clear the previce data
    }catch(err){
      console.log(err);
    }finally{
      setShow(false);
      
    }
  }

  // search 
  async function search(department) {
    let res = await axios.get(`${api}/admin/emp/user/${department}`, {withCredentials:true});
    if(res.data.user.length == 0){
      setEmployees(res.data.user);
      setEmpty('No Employee is Empty');
      setEty(true);
      return;
    }
    setEmployees(res.data.user);
    setEty(false);
  };
  

  return (
    <div className="container-fuild py-5 px-4">
  
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Employees Management</h2>
        <button className="btn btn-primary px-4 add-emp-btn" onClick={ShowAddTaskForm}>Add Employee</button>
      </div>

      <div className="search-section mb-4">
        <div className="input-group mb-3 shadow-sm">
          <span className="input-group-text bg-white border-0"><i className="bi bi-search"></i> 🔍</span>
          <input type="text" className="form-control border-0 py-2" placeholder="Search" />
        </div>

        {/* Tab Filters */}
        <div className="d-flex gap-3 border-bottom pb-2">
          {departments.map((dept, index) => (
            <button key={index} className={`btn btn-link text-decoration-none dept-tab `} onClick={()=>{search(dept)}}>
              {dept}
            </button> 
          ))}
        </div>
      </div>
      <p className='message'>{message}</p>
      {/* view data btn */}
      {
        employees.length > 4 &&
        <div className="view">
          {
            num == 4 ? <button className='btn btn-secondary px-3' onClick={viewAll}>View all</button> : <button className='btn btn-secondary px-3' onClick={HideAll}>Hide</button>
          }    
        </div>
      }
      
      {/* Add employee Form */}
      {
        show && 
        <div className="form container-fluid bg-black text-light mb-5" id='show-form'>
          <form className='row' >
            <div className='col-md-6'>
              <label htmlFor="name"> Name </label>
              <input type="text" className=' form-control' name='name' id='assign' value={val.name} onChange={handleForm} placeholder='employee name' disabled={update}/>
            </div>
            <div className='col-md-6'>
              <label htmlFor="email"> Email </label>
              <input type="text" className=' form-control' name='email' value={val.email} onChange={handleForm} placeholder='employee mail' readOnly={update}/>
            </div>
            <div className='col-md-6'>
              <label htmlFor="role" className='mt-1 pb-1'> Role </label>
              {/* <input type="text" className=' form-control' name='role' value={val.role} onChange={handleForm} placeholder='role' required/> */}
              {
                val.department == "HR" && 
                <select name="role" id="opt" className='mt-1 form-control' onChange={handleForm} value={val.role}>
                  <option value="Hr Executive">Hr Executive</option>
                  <option value="Hr Manager">Hr Manager</option>
                  <option value="Training">Training</option>
                  <option value="HR Business Partner">HR Business Partner</option>
                  <option value="HR Generalist">HR Generalist</option>
                </select>
              }
              {
                val.department == "Development" && 
                <select name="role" id="opt" className='mt-1 form-control' onChange={handleForm} value={val.role}>
                  <option value="Software Developer">Software Developer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Test Engineer">Test Engineer</option>
                  <option value="Mobile App Developer">Mobile App Developer</option>
                </select>
              }
              {
                val.department == "Marketing" &&
                <select name="role" id="opt" className='mt-1 form-control' onChange={handleForm} value={val.role}>
                  <option value="Market Executive">Market Executive</option>
                  <option value="Digital Marketing Specialist">Digital Marketing Specialist</option>
                  <option value="SEO Analyst">SEO Analyst</option>
                  <option value="Content Writer">Content Writer</option>
                  <option value="Brand Manager">Brand Manager</option>
                  <option value="Marketing Manager">Marketing Manager</option>
                </select>
              }
              {
                val.department == "Sales" && 
                <select name="role" id="opt" className='mt-1 form-control' onChange={handleForm} value={val.role}>
                  <option value="Sales Executive">Sales Executive</option>
                  <option value="Sales Manager">Sales Manager</option>
                  <option value="Account Manager">Account Manager</option>
                  <option value="Relationship Manager">Relationship Manager</option>
                </select>
              }
              
            </div>
            <div className='col-md-6'>
              <label htmlFor="opt" className='mt-1 pb-1'> Department </label>
              <select name="department" id="opt" className='mt-1 form-control' onChange={handleForm} value={val.department}>
                  <option value="HR">HR</option>
                  <option value="Development">Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
              </select>
            </div>
            {
              update && 
              <div className='col-md-6'>
                <label htmlFor="salary"> Salary </label>
                <input type="text" className=' form-control' name='salary' value={val.salary} onChange={handleForm} placeholder='salary' required/>
              </div>
            }
            {
              update && 
              <div className='col-md-6'>
                <label htmlFor="date"> Join Date </label>
                <input type="text" className=' form-control' name='date' onChange={handleForm} value={val.date} placeholder='year-month-date' required/>
              </div>
            }
            <div className="col-md-12" id='btn'>
              {
                !update ? <button className='btn btn-success px-5 py-2' onClick={addEmp}>Add Employee</button> : <button className='btn btn-success px-5 py-2' onClick={updateEmp}>Update Employee</button>
              }
              <button className='btn btn-danger px-5 py-2 ' onClick={CancelTaskForm}>Cancel</button>
            </div>
          </form>
          
        </div>
      }
      {/* Employee Table */}
      
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive table-bordered table-hover p-2" >
          <table className="table mb-0 table-hover align-middle" >
            <thead className=" table-light text-muted">
              <tr>
                <th className=' bg-secondary text-light'>Name</th>
                <th className=' bg-secondary text-light'>Email</th>
                <th className=' bg-secondary text-light'>Role</th>
                <th className=' bg-secondary text-light'>Department</th>
                <th className=' bg-secondary text-light'>Salary</th>
                <th className=' bg-secondary text-light'>Joining Date</th>
                <th className="text-center bg-secondary text-light">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.slice(0,num).map((emp, i) => (
                <tr key={i}>
                  <td className="fw-semibold">{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>{emp.department}</td>
                  <td>{`$${emp.salary}`}</td>
                  <td>{emp.date}</td>
                  <td className="text-center">
                    <button className="btn btn-primary btn-sm me-2 px-3 mt-2" onClick={()=>{editEmp(emp)}}>Edit</button>
                    <button className="btn btn-danger btn-sm mt-2" onClick={()=>{removeEmp(emp._id)}}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {
              ety && 
              <p className=' bg-secondary-subtle p-4 text-center text-danger mt-3'>
                {empty}
              </p>
            }
        </div>
      </div>

    </div>
  );
};

export default EmployeeList;
