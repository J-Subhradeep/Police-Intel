import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJs } from 'chart.js/auto';


const BarChart = ({ ChartData, options }) => {
    return (
        <div style={{ height: '400px', width: '800px' }}>
            <Bar data={ChartData} options={options} />
        </div>
    );
};

export default BarChart;
