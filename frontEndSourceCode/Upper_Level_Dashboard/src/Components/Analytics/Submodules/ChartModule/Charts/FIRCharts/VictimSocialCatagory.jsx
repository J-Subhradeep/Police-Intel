import React, { useEffect, useState } from 'react';
import PieChart from '../../ChartTemplates/PieChart';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

const dummyData = {
    "Upper Class": 10,
    "Middle Class": 20,
    "Lower Class": 10
};

const VictimSocialCategory = () => {
    const [chartData, setChartData] = useState({
        labels: ['Upper Class', 'Middle Class', 'Lower Class'],
        datasets: [{
            label: "Victim Social Category",
            data: [dummyData['Upper Class'], dummyData['Middle Class'], dummyData['Lower Class']],
            backgroundColor: [
                '#34B3F1',
                '#F15412',
                '#F9D923',
            ]
        }]
    });

    useEffect(() => {
        const totalVictims = 40;
        const newData = {
            "Upper Class": Math.round((dummyData['Upper Class'] / 40) * totalVictims),
            "Middle Class": Math.round((dummyData['Middle Class'] / 40) * totalVictims),
            "Lower Class": Math.round((dummyData['Lower Class'] / 40) * totalVictims)
        };
        setChartData({
            labels: ['Upper Class', 'Middle Class', 'Lower Class'],
            datasets: [{
                label: "Victim Social Category",
                data: [newData['Upper Class'], newData['Middle Class'], newData['Lower Class']],
                backgroundColor: [
                    '#34B3F1',
                    '#F15412',
                    '#F9D923',
                ]
            }]
        });
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
                <Typography variant="h6">Victim Social Category</Typography>
                <div style={{ width: "70%", display: "flex", justifyContent: "center" }}>
                    <PieChart ChartData={chartData} />
                </div>
            </Stack>
        </div>
    );
};

export default VictimSocialCategory;
