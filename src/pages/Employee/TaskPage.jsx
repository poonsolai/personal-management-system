import { useState, useContext, useEffect } from 'react';
import './css/task.css';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import {useHideData2} from '../../hooks/useHideData';

const TaskPage = () => {

  const {user} = useContext(AuthContext)// global variable for auth user
  // all task store this state variable
  const [tasks, setTasks] = useState([]);
  //empty 
  const [empty, setEmpty] = useState('');
  const [ety, setEty] = useState(false);
  // custom hook use by hide task and unhide a task
  const [num, viewAll, HideAll] = useHideData2(tasks);

  // task get function 
  async function getTask() {
    try{
      let res = await axios.get(`http://localhost:3000/employee/task/${user.name}`, {withCredentials:true});
      if(res.data.success){
        setEty(false);
        return setTasks(res.data.task.reverse());
      }else{
        setEty(true);
        setEmpty(res.data.message);
      }
    }catch(err){
      console.log(err);
    }
  }
  // first time run the code
  useEffect(()=>{
    getTask()//call
  }, []);
  
  return (
    <div className="container-fluid py-4 task-page px-4">
      <h2 className="mb-4 fw-bold page-title">My Tasks</h2>

      {/* Stat Cards Row */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-md-4">
          <div className="stat-card blue-gradient shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1 opacity-75">Active Tasks</p>
                <h2 className="display-5 fw-bold mb-0">{tasks.filter((t)=> t.status.toLowerCase() == 'in progress').length}</h2>
              </div>
              <div className="icon-overlay">✓</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card orange-gradient shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1 opacity-75">Completed Tasks</p>
                <h2 className="display-5 fw-bold mb-0">{tasks.filter((t)=> t.status.toLowerCase() == 'completed').length}</h2>
              </div>
              <div className="icon-overlay">≣</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="stat-card green-gradient shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1 opacity-75">Task Completion Rate</p>
                <h2 className="display-5 fw-bold mb-0">{((tasks.filter((t)=> t.status.toLowerCase() == 'completed').length)/(tasks.length)*100).toFixed(0)}<span className="h4">%</span></h2>
              </div>
              <div className="icon-overlay">◔</div>
            </div>
          </div>
        </div>
      </div>

      {/* Task List Card */}
      <div className="card border-0 shadow-sm task-container p-4">
        <h4 className="mb-4 fw-bold">My Tasks</h4>
        <div className="table-responsive">
          <table className="table align-middle custom-task-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Assigned By</th>
                <th>Status</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {tasks && tasks.slice(0, num).map((task, index) => (
                <tr key={index}>
                  <td className="fw-bold">{task.task}</td>
                  <td>{task.assign}</td>
                  <td>
                    <span className={`badge ${task.status.toLowerCase() == 'completed' ? 'bg-success-light text-success p-2' : task.status === 'In Progress' ? 'bg-primary-light text-primary p-2' : 'bg-warning-light text-warning p-2'}`}>
                        {task.status}
                      </span>
                  </td>
                  <td className="text-muted">{task.deadline}</td>
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
          <div className="text-end mt-4">
            {
              num == 2 ? <button className="btn btn-yellow-action px-5 py-2 fw-bold shadow-sm" onClick={viewAll}>View All Tasks</button> : <button className="btn btn-yellow-action px-5 py-2 fw-bold shadow-sm" onClick={HideAll}>Hide  Tasks</button>
            }
          </div>
        }
      </div>
    </div>
  );
};

export default TaskPage;
