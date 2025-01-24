import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthRedirect from './pages/Auth/AuthRedirect/AuthRedirect';
import Login from './pages/Auth/Login/Login';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthRedirect/>}/>
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
