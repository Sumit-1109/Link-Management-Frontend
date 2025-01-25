import './Dashboard.css';

import Leftbar from '../../../components/LeftBar/Leftbar';
import Navbar from '../../../components/NavBar/Navbar';

function Dashboard() {
  return (
    <div className='dashboardPage'>

        <Leftbar />

        <div className="rightBody">
            <Navbar />
        </div>
    </div>
  )
}

export default Dashboard
