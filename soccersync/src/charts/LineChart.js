import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.soccersapi.com/v2.2/leagues/?user=231244&token=5141dd56f609919d59e75f340258d327&t=list');
        const apiData = response.data.data;

        const labels = apiData.map(item => item.league_name);
        const datasets = [
          {
            label: 'Current Round ID',
            data: apiData.map(item => item.current_round_id),
            fill: false,
            borderColor: 'rgba(255, 99, 132, 0.6)',
            tension: 0.5
          },
          {
            label: 'Current Season ID',
            data: apiData.map(item => item.current_season_id),
            fill: false,
            borderColor: 'rgba(54, 162, 235, 0.6)',
            tension: 0.5
          }
        ];

        const chartData = { labels, datasets };
        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="line-chart-container">
      <h1>League Data</h1>
      {error && <p>Error: {error.toString()}</p>}
      {chartData && <Line data={chartData} options={{
        plugins: {
          title: {
            display: true,
            text: 'League Data Overview'
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }} />}
    </div>
  );
};

export default LineChart;