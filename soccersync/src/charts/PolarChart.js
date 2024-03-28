import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.soccersapi.com/v2.2/leagues/?user=231244&token=5141dd56f609919d59e75f340258d327&t=list');
        const apiData = response.data.data;

        const labels = ['option 1', 'option 2', 'option 3']; 
        const datasets = [
          {
            label: 'Dataset 1',
            data: apiData.map(item => item.current_round_id), 
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: apiData.map(item => item.current_season_id), 
            backgroundColor: 'blue',
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Soccer Polar Area Chart',
      },
    },
  };

  return (
    <div className="polar-chart-container">
      <h1>Soccer Polar Area Chart</h1>
      {error && <p>Error: {error.toString()}</p>}
      {chartData && <PolarArea data={chartData} options={options} />}
    </div>
  );
};

export default PolarChart;