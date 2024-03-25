import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
};

const labels = ['option 1', 'option 2', 'option 3'];

const BarChart = () => {
    const [teamSeasons, setTeamSeasons] = useState([]);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({
      labels,
      datasets: []
    });

        // useEffect(() => {
    //     axios.get('https://api.soccersapi.com/v2.2/leagues/?user=231244&token=5141dd56f609919d59e75f340258d327&t=list')
    //     .then(res => {
    //         console.log(res.data);
    //         setScriptLoaded(res.data);
    //     })
    //     .catch(error => {
    //         console.error('There was an error!', error);
    //         // alert("An unexpected error occurred. No data received");
    //     });
    // }, []);

    useEffect(() => {
        axios.get('https://api.soccersapi.com/v2.2/leagues/?user=231244&token=5141dd56f609919d59e75f340258d327&t=list')
        .then(res => {
            const apiData = res.data.data; 
            // console.log(apiData);

            const newChartData = {
              labels: chartData.labels, 
              datasets: [
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
              ]
            };
            setChartData(newChartData);
        })
        .catch(error => {
            console.error('There was an error!', error);
            setError(error);
        });
    }, []);

    return (
        <div>
            <h1>Team Seasons</h1>
            {error && (
                <p>Error: {error.toString()}</p>
            )}

            <Bar options={options} data={chartData} />
        </div>
    );
};

export default BarChart;