import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthRedirect from './pages/Auth/AuthRedirect/AuthRedirect';
import Login from './pages/Auth/Login/Login';
import Signup from './pages/Auth/Signup/Signup';
import { useState } from 'react';
import Toast from './components/Toast/Toast';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';


function App() {

  const [toast, setToast] = useState({
    show: false,
    message: '',
  });

  const showToast = (message) => {
    setToast({
      show: true,
      message
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: ''
      });
    }, 5000);
  };

  const hideToast = () => {
    setToast({
      show: false,
      message: ''
    });
  };

  return (
    <div>
      <BrowserRouter>

        {
          toast.show && (
            <Toast message={toast.message} onClose={hideToast} />
          )
        }

        <Routes>
          <Route path='/' element={<AuthRedirect/>}/>
          <Route path='/login' element={<Login showToast={showToast} />} />
          <Route path='/signup' element={<Signup showToast={showToast} />} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
