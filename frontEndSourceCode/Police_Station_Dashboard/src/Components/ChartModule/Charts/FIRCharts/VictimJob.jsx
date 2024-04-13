import React, { useEffect, useState } from 'react';
import PieChart from '../../ChartTemplates/PieChart';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

const dummyData = {
    "Private Service": 10,
    "Government Job": 5,
    "Retired Person": 3,
    "Student": 8,
    "Unemployed": 7,
    "Business": 7
}

const VictimJob = ({ data }) => {

    const [chartData, setChartData] = useState({
        labels: Object.keys(dummyData),
        datasets: [{
            label: "Victim Job",
            data: Object.values(dummyData),
            backgroundColor: [
                '#34B3F1',
                '#F15412',
                '#9370DB',
                '#FF6F61',
                '#56CB7B',
                '#F9D923'
            ]
        }]
    })

    useEffect(() => {
        setChartData({
            labels: Object.keys(dummyData),
            datasets: [{
                label: "Victim Job",
                data: Object.values(dummyData),
                backgroundColor: [
                    '#34B3F1',
                    '#F15412',
                    '#9370DB',
                    '#FF6F61',
                    '#56CB7B',
                    '#F9D923'
                ]
            }]
        })
    }, [data]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
                <Typography variant="h6">Victim Job</Typography>
                <div style={{ width: "70%", display: "flex", justifyContent: "center" }}>
                    <PieChart ChartData={chartData} />
                </div>
            </Stack>
        </div>
    );
};

export default VictimJob;
