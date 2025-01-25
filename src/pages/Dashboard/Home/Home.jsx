import './Home.css';

import Leftbar from '../../../components/LeftBar/Leftbar';
import Navbar from '../../../components/NavBar/Navbar';
import { Outlet } from 'react-router-dom';

function Home() {

  return (
    <div className='homePage'>

        <Leftbar />

        <div className="rightBody">
            <Navbar />

            <div className="homeBody">
              <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Home
