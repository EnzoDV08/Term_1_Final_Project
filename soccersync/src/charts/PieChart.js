import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [teamSeasons, setTeamSeasons] = useState([]);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    axios
      .get('https://api.soccersapi.com/v2.2/leagues/?user=231244&token=5141dd56f609919d59e75f340258d327&t=list')
      .then(res => {
        const apiData = res.data.data;
        console.log('API Data:', apiData); 
        const labels = apiData.map(item => item.team_name);
        const datasets = [
          {
            data: apiData.map(item => item.points),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
            borderWidth: 1,
          },
        ];
        console.log('Labels:', labels); // Log labels to console
        console.log('Datasets:', datasets); // Log datasets to console
        setChartData({ labels, datasets });
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError(error);
      });
  }, []);

  console.log('ChartData:', chartData); // Log chartData to console

  return (
    <>
      <h1>Soccer Team Distribution</h1>
      {error && <p>Error: {error.toString()}</p>}
      <Pie data={chartData} />
    </>
  );
};

export default PieChart;