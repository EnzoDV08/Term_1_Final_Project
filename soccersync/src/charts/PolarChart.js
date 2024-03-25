import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarChart = () => {
  const data = {
    labels: ['Manchester United', 'Manchester City', 'Everton'],
    datasets: [
      {
        label: 'Goals Scored', 
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', 
          'rgba(75, 192, 192, 0.5)', 
          'rgba(255, 205, 86, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 20 
      }
    }
  };

  return (
    <>
      <h1>Soccer Polar Area Chart</h1>
      <PolarArea data={data} options={options} />
    </>
  );
};

export default PolarChart;