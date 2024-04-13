import React, { useEffect, useState } from 'react';
import PieChart from '../../ChartTemplates/PieChart';
import { PositiveAndNegative } from '../Data';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';


const PositiveAndNegativeReviews = ({ positivity }) => {

    console.log(positivity)

    const [chartData, setChartData] = useState({
        labels: ['Positive', 'Negative'],
        datasets: [{
            label: "Positive and Negative Feedbacks",
            data: [positivity.positive, positivity.negative],
            backgroundColor: [
                '#016fc4',
                '#50e3c2',
            ]
        },

        ]
    })

    useEffect(() => {
        setChartData({
            labels: ['Positive', 'Negative'],
            datasets: [{
                label: "Positive and Negative Reviews",
                data: [positivity.positive, positivity.negative],
                backgroundColor: [
                    '#016fc4',
                    '#50e3c2',
                ]
            },

            ]
        })
    }, [positivity]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '70px' }}>
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
                <Typography variant="h6">Positive and Negative Feedback</Typography>
                <PieChart ChartData={chartData} />
            </Stack>
        </div>
    );
};

export default PositiveAndNegativeReviews
