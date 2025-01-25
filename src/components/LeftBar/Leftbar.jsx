import "./Leftbar.css";
import CuvetteLogo from "../../assets/cuvetteLogo.svg";
import dashboard from '../../assets/dashboard.png';
import link from '../../assets/link.png';   
import analytics from '../../assets/analytics.png'
import settings from '../../assets/settings.png';

function Leftbar() {
  return (
    <div className="leftbarSection">

      <div className="leftbarLogo">
        <img src={CuvetteLogo} alt="Cuvette" />
      </div>

      <div className="dashboardTabs">

        <div className="dashboardTabName">
          <img src={dashboard} alt="" /><p>Dashboard</p>
        </div>

        <div className="dashboardTabName">
          <img src={link} alt="" /><p>Links</p>
        </div>

        <div className="dashboardTabName">
          <img src={analytics} alt="" /><p>Analytics</p>
        </div>

      </div>

      <div className="dashboardSettings">
        <img src={settings} alt="" /><p>Settings</p>
      </div>
    </div>
  );
}

export default Leftbar;
