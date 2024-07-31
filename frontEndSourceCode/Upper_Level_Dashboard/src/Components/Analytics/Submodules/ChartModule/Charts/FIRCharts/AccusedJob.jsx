import React, { useEffect, useState } from 'react';
import PieChart from '../../ChartTemplates/PieChart';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

const dummyData = {
    "Private Service": 3,
    "Government Job": 2,
    "Business": 7,
    "Unemployed": 12,
    "Student": 2,
    "Retired Person": 4
}

const AccusedJob = ({ data }) => {

    const [chartData, setChartData] = useState({
        labels: Object.keys(dummyData),
        datasets: [{
            label: "Accused Job",
            data: Object.values(dummyData),
            backgroundColor: [
                '#34B3F1',
                '#F15412',
                '#F9D923',
                '#56CB7B',
                '#FF6F61',
                '#9370DB'
            ]
        }]
    })

    useEffect(() => {
        setChartData({
            labels: Object.keys(dummyData),
            datasets: [{
                label: "Accused Job",
                data: Object.values(dummyData),
                backgroundColor: [
                    '#34B3F1',
                    '#F15412',
                    '#F9D923',
                    '#56CB7B',
                    '#FF6F61',
                    '#9370DB'
                ]
            }]
        })
    }, [data]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
                <Typography variant="h6">Accused Job</Typography>
                <div style={{ width: "70%", display: "flex", justifyContent: "center" }}>
                    <PieChart ChartData={chartData} />
                </div>
            </Stack>
        </div>
    );
};

export default AccusedJob;
