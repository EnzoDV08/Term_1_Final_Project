import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = () => {
  const data = {
    labels: ['Goals', 'Assists', 'Tackles', 'Passes', 'Shots', 'Saves', 'Interceptions'], 
    datasets: [
      {
        label: 'Everton (2023-2024 Season)',
        data: [65, 40, 50, 7000, 800, 30, 40], 
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 3,
        pointBackgroundColor: '#fff', 
        pointBorderColor: 'rgba(255, 99, 132, 1)', 
        pointBorderWidth: 2,
        pointHitRadius: 10, 
        pointRadius: 4,
        pointRotation: 45, 
        pointStyle: 'triangle' 
      }
    ],
  };

  const options = {
    elements: {
      line: {
        borderColor: '#fff', 
      }
    },
    scale: {
      grid: {
        color: '#fff', 
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;