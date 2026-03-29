import '../css/signup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { faMale } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm'; //custom hook
import axios from 'axios';
import { useState } from 'react';
import Load from '../components/Load';
import { useNavigate } from 'react-router-dom';
import api from '../hooks/api';

const SignUpPage = () => {
  //auto navigater
  const navigate = useNavigate();
  //state variable for manage the input value using cutom hook
  const {val, handleForm} = useForm({name:"", email:"", password:"", gender:'male'});
  // state variable for err message
  const [err,setErr] = useState('');
  // error msg show panna use pannurom
  const [error,setError] = useState(false);
  // error msg show panna use pannurom
  const [load,setLoad] = useState(false);
  // state variable for sucess msg 
  const [msg,setMsg] = useState('');
  // true 
  const [btn, setBtn] = useState(false);
  //submit the data for backend
  async function submitData(e){
    e.preventDefault(); // page reload block panna 
    setLoad(true);
    const {name, email, password, gender} = val;

    if(name==""|| email=="" || password=="" || gender==''){
      setLoad(false);
      setError(true);
      return setErr("Fill all Fields");
    }else if(!email.includes("@") || !email.includes(".") || !email.includes("gmail") || !email.includes("com")){
      setLoad(false);
      setError(true);
      return setErr("Enter vaild mail address");
    }else if(password.length < 8){
      setLoad(false);
      setError(true);
      return setErr("Password must be atleast 8 characters.");
    }else{
      setError(false);
    }
    
    try{
      let res = await axios.post(`${api}/auth/signup`,val,{withCredentials:true});
      setBtn(true);
      if(res.data.success){
        setError(false);
        setMsg(res.data.message);
        navigate('/login');
      }else{
        setError(true);
        setErr(res.data.message);
      }
    }catch(err){
      console.log(err);
    }finally{
      setLoad(false);
      setBtn(true);
    }

  }


  return (
    
    <div className="container d-flex justify-content-center align-items-center min-vh-100"> 
      <div className="card shadow-lg border-0 signup-card w-100" style={{ maxWidth: '450px' }}>
        <div className="card-header border-0 text-center py-2 bg-yellow" id='head'>
          <img src={logo} alt="" className='image'/>
                    <h1 className="d-block fw-bold mb-1 text" id='head-text'><span>I</span>nnovixus</h1>
        </div>
        <div className="card-body ">
          <h4 className="text-center mb-4 fw-bold">Employee & Admin Sign Up</h4>
          {
            load && <Load />
          }
          <form>
            <div className="mb-3">
              <label className="form-label small fw-bold">Full Name</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <FontAwesomeIcon icon={faUser} className="text-muted" />
                </span>
                <input type="text" className="form-control border-start-0 ps-0" placeholder="Full Name" value={val.name} name='name' onChange={handleForm}/>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <FontAwesomeIcon icon={faEnvelope} className="text-muted" />
                </span>
                <input type="email" className="form-control border-start-0 ps-0" placeholder="Email Address" value={val.email} name='email' onChange={handleForm}/>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <FontAwesomeIcon icon={faLock} className="text-muted" />
                </span>
                <input type="password" className="form-control border-start-0 ps-0" placeholder="Password" value={val.password} name='password' onChange={handleForm}/>
              </div>
              <small className="text-muted" style={{ fontSize: '0.7rem' }}>Password must be atleast 8 characters.</small>
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Gender</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <FontAwesomeIcon icon={faMale} className="text-muted" />
                </span>
                <select name="gender" id="opt" className=' form-control' onChange={handleForm} value={val.gender}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            
              <div className="mb-3">
                  <label className="form-label small fw-bold">ADMIN KEY <span style={{opacity:.5}}>(optional)</span></label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FontAwesomeIcon icon={faLock} className="text-muted" />
                    </span>
                    <input type="password" className="form-control border-start-0 ps-0" placeholder="ADMIN KEY" name='key' value={val.key} onChange={handleForm}/>
                  </div>
              </div>
              
              <div >
                { error ? <p className='err'>{err}</p> : <p className='success'>{msg}</p>}
              </div>

            <button type="submit" className="btn btn-yellow w-100 py-2 fw-bold shadow-sm mt-3" onClick={submitData} disabled={btn}>Sign Up</button>
          </form>
          <p className="text-center mt-4 small">
            Already have an account? <Link className="text-primary fw-bold cursor-pointer un" to={'/login'}>Login</Link>
          </p>
        </div>
        <div className="card-a card-footer bg-transparent border-0 text-center ">
          <small className="text-muted">© 2024 Software Personal Management System. All rights reserved.</small>
        </div>
      </div>
      
    </div>
  );
};

export default SignUpPage;
