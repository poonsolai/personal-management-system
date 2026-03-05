import App from './App.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const support = () => {
  return (
    <>
        <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignUpPage/>}/>
            <Route path='/*' element={<App/>}/>
        </Routes>
    </>
  )
}

export default support
