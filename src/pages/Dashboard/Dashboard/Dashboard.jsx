import './Dashboard.css';

import Leftbar from '../../../components/LeftBar/Leftbar';
import Navbar from '../../../components/NavBar/Navbar';
import { useState } from 'react';

function Dashboard() {

    const [selectedTab, setSelectedTab] = useState('dashboard');

  return (
    <div className='dashboardPage'>

        <Leftbar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />

        <div className="rightBody">
            <Navbar />
        </div>
    </div>
  )
}

export default Dashboard
