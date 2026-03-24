import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/salaryAdmin.css';
import lock from '../../assets/lock.png'
import axios from 'axios';

const SalaryPageAdmin = () => {
    const [isLocked, setIsLocked] = useState(false);
    const [status, setStatus] = useState('Not Set'); // Status: Not Set, Pending, Paid
    const [statuss, setStatuss] = useState({is_generate:"", is_paid:""});
    const {is_generate, is_paid} = statuss;
    const [data, setData] = useState([]);
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.toLocaleString('default', { month: 'long' });

    async function fetchStatus() {
        let res = await axios.get("http://localhost:3000/payslip/status", {withCredentials:true});
        setStatuss({...statuss, is_generate:res.data.ans.is_generate, is_paid:res.data.ans.is_paid});
    }

    useEffect(()=>{
        if(currentDay !== 5){
            setIsLocked(true);// day 5 illa lock 
        }else{
            setIsLocked(false); // day 5 na open 
        }
        if(statuss.is_generate && statuss.is_paid){
            setIsLocked(true); // day 5 ah irundhalum  once paid and generate pannita  lock
        }
        fetchStatus()//call
    }, [is_generate, is_paid, status]);

    
    
    const handleCreatePayslip = async () => {
        // Database update logic inga varum
        const res =await axios.get("http://localhost:3000/payslip/createslip", {withCredentials:true});

        if(!res.data.success){
            setStatus(res.data.message);
        }
        if(res.data.success){
            setStatus(res.data.staus);
            setData(res.data.data);
        }
        fetchStatus()//call
    };

    const handleCompletePayment =async () => {
        // Database update logic inga varum
        const res =await axios.patch("http://localhost:3000/payslip/credit", {withCredentials:true});
        if(res.data.success){
            setStatus(res.data.status);
            setIsLocked(true); // Process mudinja odane auto-lock
        }
        fetchStatus()//call
    };
    return (
        <div className="container-fulid mt-4" >
            <div className={`card shadow salary-container box-page ${isLocked ? 'disabled-page' : ''}`}>
                
                {/* Security Lock Overlay */}
                {isLocked && (
                    <div className="lock-overlay">
                        <div className="lock-icon-container">
                            {/* Inga unga lock image URL-ai replace pannunga */}
                            <img src={lock} ></img>
                        </div>
                        <h2 className="fw-bold">PAYROLL LOCKED</h2>
                        <p className="lead">ONLY ACTIVE ON <b>EveryMonth 5th Only</b></p>
                        {status === "Paid" && <div className="badge bg-success p-2 mt-2 text-uppercase">Monthly Action Completed</div>}
                    </div>
                )}

                {/* Header Section */}
                <div className="card-header bg-primary text-white p-4">
                    <h3 className="mb-0">Welcome Admin! - Salary & Payroll</h3>
                </div>
                
                <p className=' status'>{status}</p>
                
                <div className="card-body p-4">
                    <div className="row mb-4">
                        <div className="col-md-6 mb-3">
                            <button 
                                className={`btn w-100 p-4 border-2 fw-bold ${status === "Not Set" ? 'btn-outline-primary' : 'btn-light disabled'}`}
                                onClick={handleCreatePayslip}
                            >
                                <h4 className="mb-1">CREATE PAYSLIPS</h4>
                                <small>(Sets Status: Pending)</small>
                            </button>
                        </div>
                        <div className="col-md-6 mb-3">
                            <button 
                                className={`btn w-100 p-4 border-2 fw-bold ${status === "Pending" ? 'btn-outline-success' : 'btn-light disabled'}`}
                                onClick={handleCompletePayment}
                            >
                                <h4 className="mb-1">COMPLETE PAYMENT</h4>
                                <small>(Sets Status: Paid)</small>
                            </button>
                        </div>
                    </div>

                    {/* Upcoming Payments Table */}
                    <div className="table-responsive">
                        <h5 className="text-secondary mb-3">Upcoming Payments Status</h5>
                        <table className="table table-hover align-middle border">
                            <thead className="table-light">
                                <tr>
                                    <th>Employee</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Generate Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((emp, index) => (
                                    <tr key={index}>
                                        <td className="fw-bold">{emp.emp_name}</td>
                                        <td>{emp.net}</td>
                                        <td>
                                            <span className={`badge ${status === 'Paid' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td>{emp.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <p className="text-center mt-3 text-muted small italic">
                * Automatic action runs if not manually processed by end of day on the 5th.
            </p>
        </div>
    );
};

export default SalaryPageAdmin;
