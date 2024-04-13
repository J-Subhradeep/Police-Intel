import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJs } from 'chart.js/auto';


const PieChart = ({ ChartData }) => {
    return (
        <div style={{ height: '400px', width: '800px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Pie data={ChartData} />
        </div>
    );
};

export default PieChart;
