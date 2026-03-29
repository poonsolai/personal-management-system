import '../css/login.css'
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm'; //custom hook
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Load from '../components/Load';
 import api from '../hooks/api';
 
const LoginPage = () => {
  //global variable useing
  const {login} = useContext(AuthContext);
  //navigate route automatically for login page
  const navigate = useNavigate();
  // error msg show panna use pannurom
  const [error,setError] = useState(false);
  // error msg variable 
  const [err, setErr] = useState(false);
  // success msg variable
  // error msg show panna use pannurom
  const [load,setLoad] = useState(false);
  const [success, setSuccess] = useState(false);
  //state variable for manage the input value using cutom hook
  const {val, handleForm} = useForm({mail:"", password:""});
  // true 
  const [btn, setBtn] = useState(false);
  //submit the data for backend
  async function submitData(e){
    e.preventDefault();
    setLoad(true); // load component show
    const {mail, password} = val;

    try{
      let res = await axios.post(`${api}/auth/login`, val, {withCredentials:true});
      setBtn(true);
      if(res.data.success){
        setSuccess(res.data.message);
        setError(false);
        login(res.data.user); // user data store in global variable
        localStorage.setItem('user',JSON.stringify(res.data.user)); // localStorage la save the user
        
        if(res.data.user.role == "admin"){
          navigate('/admin/dashbord')
        }else{
           navigate('/employee/dashbord')
        }
      }else{
        setErr(res.data.message);
        setError(true);
      }
    }catch(err){
      console.log(err);
    }finally{
      setLoad(false);
      setBtn(false);
    }
  }
 

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg border-0 login-card w-100" style={{ maxWidth: '450px' }}>
        <div className="card-header border-0 text-center py-2 bg-yellow" id='head'>
          <img src={logo} alt="" className='image'/>
          <h1 className="d-block fw-bold mb-1 text" id='head-text'><span>I</span>nnovixus</h1>
        </div>
        <div className="card-body ">
          <h3 className="text-center mb-4 fw-bold">Employee & Admin Login</h3>
          {
            load && <Load />
          }
          <form>
            <div className="mb-3">
              <label className="form-label small fw-bold">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <FontAwesomeIcon icon={faEnvelope} className="text-muted" />
                </span>
                <input type="email" className="form-control border-start-0 ps-0" placeholder="Email Address" value={val.mail} name='mail' onChange={handleForm}/>
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
              
            </div>
            <div className="mb-2 text-end">
              <a  className="text-decoration-none" >Forgot Password?</a>
            </div>
            <div>
              { error ? <p style={{color:"red"}}>{err}</p> : <p style={{color:"green"}}> {success}</p> }
            </div>
            <button type="submit" className="btn btn-yellow w-100 py-2 fw-bold shadow-sm mt-3on" onClick={submitData} disabled={btn}>Login</button>
          </form>
          <p className="text-center mt-4 small">
            Don't have an account? <Link className="text-primary fw-bold cursor-pointer un" to={'/signup'}>Sign Up</Link>
          </p>
        </div>
        <div className="card-footer bg-transparent border-0 text-center pb-4">
          <small className="text-muted">© 2024 Software Personal Management System. All rights reserved.</small>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
