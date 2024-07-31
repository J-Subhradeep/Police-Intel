import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

const AreaChart = ({ ChartData, options }) => {
    return (
        <div style={{ height: '400px', width: '800px' }}>
            <Line data={ChartData} options = {options} />
        </div>
    );
};

export default AreaChart;
