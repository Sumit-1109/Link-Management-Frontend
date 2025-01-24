import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthRedirect from './pages/Auth/AuthRedirect/AuthRedirect';
import Login from './pages/Auth/Login/Login';
import Signup from './pages/Auth/Signup/Signup';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthRedirect/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
