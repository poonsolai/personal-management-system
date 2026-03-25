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

const LoginPage = () => {
  //global variable useing
  const {user, login} = useContext(AuthContext);
  //navigate route automatically for login page
  const navigate = useNavigate();
  // error msg show panna use pannurom
  const [error,setError] = useState(false);
  // error msg variable 
  const [err, setErr] = useState(false);
  // success msg variable
  const [success, setSuccess] = useState(false);
  //state variable for manage the input value using cutom hook
  const {val, handleForm} = useForm({mail:"", password:""});
  
  //submit the data for backend
  async function submitData(e){
    e.preventDefault();
    const {mail, password} = val;
    if(mail == "" || password == ""){
      setErr("fill all filed");
    }
    
    try{
      let res = await axios.post('https://personal-management-system-backend.onrender.com/auth/login', val, {withCredentials:true});
      
      if(res.data.success){
        setSuccess(res.data.message);
        setError(false);
        login(res.data.user); // user data store in global variable
        // localStorage la save the user
        localStorage.setItem('user',JSON.stringify(res.data.user));
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
            <button type="submit" className="btn btn-yellow w-100 py-2 fw-bold shadow-sm mt-3on" onClick={submitData}>Login</button>
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
