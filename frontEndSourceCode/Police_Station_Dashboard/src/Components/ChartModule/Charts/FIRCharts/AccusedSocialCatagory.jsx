import React, { useEffect, useState } from 'react';
import PieChart from '../../ChartTemplates/PieChart';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

const dummyData = {
    "Upper Class": 11,
    "Middle Class": 14,
    "Lower Class": 5
};

const AccusedSocialCategory = ({ data }) => {
    const [chartData, setChartData] = useState({
        labels: ['Upper Class', 'Middle Class', 'Lower Class'],
        datasets: [{
            label: "Accused Social Category",
            data: [dummyData['Upper Class'], dummyData['Middle Class'], dummyData['Lower Class']],
            backgroundColor: [
                '#34B3F1',
                '#F15412',
                '#F9D923',
            ]
        }]
    });

    useEffect(() => {
        setChartData({
            labels: ['Upper Class', 'Middle Class', 'Lower Class'],
            datasets: [{
                label: "Accused Social Category",
                data: [dummyData['Upper Class'], dummyData['Middle Class'], dummyData['Lower Class']],
                backgroundColor: [
                    '#34B3F1',
                    '#F15412',
                    '#F9D923',
                ]
            }]
        });
    }, [data]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
                <Typography variant="h6">Accused Social Category</Typography>
                <div style={{ width: "70%", display: "flex", justifyContent: "center" }}>
                    <PieChart ChartData={chartData} />
                </div>
            </Stack>
        </div>
    );
};

export default AccusedSocialCategory;
