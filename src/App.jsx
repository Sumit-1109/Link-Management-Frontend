import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthRedirect from './pages/Auth/AuthRedirect/AuthRedirect';
import Login from './pages/Auth/Login/Login';
import Signup from './pages/Auth/Signup/Signup';
import { useState } from 'react';
import Toast from './components/Toast/Toast';
import Home from './pages/Dashboard/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';
import LinkSection from './pages/Dashboard/LinkSection/LinkSection';
import Analytics from './pages/Dashboard/Analytics/Analytics';
import Settings from './pages/Dashboard/Settings/Settings';


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


          <Route path='/home' element={<Home/>}>
            <Route index element={<Dashboard />} />
            <Route path='/home/links' element={<LinkSection/>} />
            <Route path='/home/analytics' element={<Analytics/>} />
            <Route path='/home/settings' element={<Settings/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
