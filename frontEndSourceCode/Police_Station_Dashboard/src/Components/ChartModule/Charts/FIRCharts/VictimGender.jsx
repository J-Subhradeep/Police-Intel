import React, { useEffect, useState } from 'react';
import PieChart from '../../ChartTemplates/PieChart';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

const dummyData = {
    "Male": 22, "Female": 15, "Other": 13
}

const VictimGender = () => {

    const [chartData, setChartData] = useState({
        labels: ['Male', 'Female', 'Other'],
        datasets: [{
            label: "Victim Gender",
            data: [dummyData.Male, dummyData.Female, dummyData.Other],
            backgroundColor: [
                '#34B3F1',
                '#F15412',
                '#F9D923',
            ]
        }]
    })

    useEffect(() => {
        setChartData({
            labels: ['Male', 'Female', 'Other'],
            datasets: [{
                label: "Victim Gender",
                data: [dummyData.Male, dummyData.Female, dummyData.Other],
                backgroundColor: [
                    '#34B3F1',
                    '#F15412',
                    '#F9D923',
                ]
            }]
        })
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
                <Typography variant="h6">Victim Gender</Typography>
                <div style={{ width: "70%", display: "flex", justifyContent: "center" }}>
                    <PieChart ChartData={chartData} />
                </div>
            </Stack>
        </div>
    );
};

export default VictimGender;
