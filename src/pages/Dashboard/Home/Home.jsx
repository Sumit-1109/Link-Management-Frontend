import './Home.css';

import Leftbar from '../../../components/LeftBar/Leftbar';
import Navbar from '../../../components/NavBar/Navbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../../../components/Modal/Modal';

function Home() {

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);


  return (
    <div className='homePage'>

        <Leftbar setEditModal = {setEditModal} />

        <div className="rightBody">
            <Navbar setShowModal = {setShowModal} />

            <div className="homeBody">
              <Outlet />
            </div>
        </div>

        {
                showModal && (
                  <Modal editModal={editModal} setShowModal={setShowModal} setEditModal = {setEditModal} />
                )
              }
    </div>
  )
}

export default Home
