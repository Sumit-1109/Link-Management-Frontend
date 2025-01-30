import './Dashboard.css';
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getDashboardLinkDetails } from "../../../services/link";
import PropTypes from 'prop-types';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ChartDataLabels);

const token = localStorage.getItem("token");

const Dashboard = ({showToast}) => {

  const [totalClicks, setTotalClicks] = useState(0);
  const [dateLabels, setDateLabels] = useState([]);
  const [dateClicks, setDateClicks] = useState([]);
  const [deviceLabels, setDeviceLabels] = useState([]);
  const [deviceClicks, setDeviceClicks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardLinkDetails(token);
        

        if (res.status === 200) {
          const data = await res.json();

          setTotalClicks(data.totalClicks);


          setDateLabels(Object.keys(data.dateAnalytics).reverse());
          setDateClicks(Object.values(data.dateAnalytics).reverse());


          setDeviceLabels(Object.keys(data.deviceAnalytics));
          setDeviceClicks(Object.values(data.deviceAnalytics));

        } else {
          const data = await res.json();
          showToast(data.message)
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchData();
  }, [token]);

  const dateWiseData = {
    labels: dateLabels,
    datasets: [
      {
        data: dateClicks,
        backgroundColor: "rgba(27, 72, 218, 1)",
        borderRadius: 5,
        barThickness: 15,
      },
    ],
  };

  const deviceWiseData = {
    labels: deviceLabels,
    datasets: [
      {
        data: deviceClicks,
        backgroundColor: "rgba(27, 72, 218, 1)",
        borderRadius: 5,
        barThickness: 15,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: {
        anchor: "end",
        align: "end",
        color: 'rgba(24, 24, 32, 1)',
        font: {
          family: 'Manrope',
          size: '12',
          weight: 700,
        },
        formatter: (value) => `${value}`,
        offset : 5,
      },
    },
    scales: {
      x: { display: false },
      y: { 
        grid: { display: false },
        barPercentage: 0.8,
        categoryPercentage: 0.8,
        ticks: {
          font: {
            family: 'Manrope',
            size: '12',
            weight: 700,
          },
          color: 'rgba(24, 24, 32, 1)'
        }
      },
    },
    layout: {
      padding: {
        right: 50,
      },
    },
  };

  return (
    <div className="dashboardComponent">
      <div className="dashboardHeader" >
        <p>Total Clicks</p>
        <span>{totalClicks}</span>
      </div>


      <div className="dashboardGraphsContainer">
        <div className='dashboardGraph date-wise'>
          <p className='dashboardGraph-label'>Date-wise Clicks</p>
          <Bar className='barGraph' data={dateWiseData} options={options} />
        </div>
        <div className='dashboardGraph device-wise'>
          <p className='dashboardGraph-label'>Click Devices</p>
          <Bar className='barGraph' data={deviceWiseData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  showToast: PropTypes.func,
}