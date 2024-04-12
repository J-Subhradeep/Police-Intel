import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import AreaChart from '../../ChartTemplates/AreaChart';

const dummyData = [
    { date: "1-4-24", number: 6 },
    { date: "2-4-24", number: 2 },
    { date: "3-4-24", number: 8 },
    { date: "4-4-24", number: 6 },
    { date: "5-4-24", number: 5 },
    { date: "6-4-24", number: 8 },
    { date: "7-4-24", number: 0 },
    { date: "8-4-24", number: 1 },
    { date: "9-4-24", number: 5 },
]

const FIRRegistererdPerDay = () => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    const [chartData, setChartData] = useState({
        labels: dummyData.map((data) => data.date),
        datasets: [{
            label: "FIR Registered Per Day",
            data: dummyData.map((data) => data.number),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            fill: 'origin' // Add this line to make it an area chart
        }]
    })

    useEffect(() => {
        setChartData({
            labels: dummyData.map((data) => data.date),
            datasets: [{
                label: "FIR Registered Per Day",
                data: dummyData.map((data) => data.number),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                fill: 'origin' // Add this line to make it an area chart
            }]
        })
    }, [dummyData]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '70px' }}>
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
                <Typography variant="h6">FIR Registered Per Day</Typography>
                <AreaChart options={options} ChartData={chartData} />
            </Stack>
        </div>
    );
};

export default FIRRegistererdPerDay;
