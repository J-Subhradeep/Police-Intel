import React, { useEffect, useState } from 'react';
import PieChart from '../../ChartTemplates/PieChart';
import { PositiveAndNegative } from '../Data';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

const dummyData = {
    "henious": 37, "non_henious": 63
}

const CrimeType = ({ data }) => {

    const [chartData, setChartData] = useState({
        labels: ['Henious', 'Non Henious'],
        datasets: [{
            label: "Crime Type",
            data: [dummyData.henious, dummyData.non_henious],
            backgroundColor: [
                '#F15412',
                '#34B3F1',
            ]
        },

        ]
    })

    useEffect(() => {
        setChartData({
            labels: ['Henious', 'Non Henious'],
            datasets: [{
                label: "Crime Type",
                data: [dummyData.henious, dummyData.non_henious],
                backgroundColor: [
                    '#F15412',
                    '#34B3F1',
                ]
            },

            ]
        })
    }, [data]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
                <Typography variant="h6">Crime Type</Typography>
                <div style={{ width: "70%", display: "flex", justifyContent: "center" }}>
                    <PieChart ChartData={chartData} />
                </div>
            </Stack>
        </div>
    );
};

export default CrimeType;
