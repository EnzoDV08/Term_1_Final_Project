import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios'; // Import Axios

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
          params: { league: '39', season: '2023' }, // Adjust parameters for Premier League and the desired season
          headers: {
            'X-RapidAPI-Key': 'bc8437320fmsh870b38582d18a1ap1b1062jsnf4d6e77c399b',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
          }
        };

        // Fetch data using Axios
        const response = await axios.request(options);
        const data = response.data;

        // Process the data from the API response to fit the chart data structure
        const teams = data.response; // Assuming the response data has a 'response' property containing teams
        const labels = teams.map(team => team.team.name); // Extract team names as labels
        const datasets = [
          {
            label: 'Teams',
            data: teams.map(team => team.team.id), // Extract team IDs as data points
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.5
          }
        ];

        const processedData = { labels, datasets };

        setChartData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Premier League Teams Data',
      },
    },
  };

  return (
    <>
      <h1>Premier League Teams Line Chart</h1>
      {chartData && <Line options={options} data={chartData} />}
    </>
  );
};

export default LineChart;