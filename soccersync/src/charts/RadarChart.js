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
        data: [65, 40, 50, 7000, 800, 30, 40], // Everton Soccer Team's stats for the 2023-2024 season
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 3,
        pointBackgroundColor: '#fff', // Set the fill color for points to white
        pointBorderColor: 'rgba(255, 99, 132, 1)', // Set the border color for points to the same as the radar lines
        pointBorderWidth: 2, // Set the width of the point border
        pointHitRadius: 10, // Set the pixel size of the non-displayed point that reacts to mouse events
        pointRadius: 4, // Set the radius of the point shape
        pointRotation: 45, // Set the rotation of the point in degrees
        pointStyle: 'triangle' // Set the style of the point
      }
    ],
  };

  const options = {
    elements: {
      line: {
        borderColor: '#fff', // Set the radar lines to be white
      }
    },
    scale: {
      grid: {
        color: '#fff', // Set the color of the grid lines to white
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