import React, { useEffect, useState } from 'react';
import PieChart from '../../ChartTemplates/PieChart';
import { PositiveAndNegative } from '../Data';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';


const TaskPieChart = ({ data }) => {
    console.log(data)
    const [chartData, setChartData] = useState({
        labels: ['Completed Tasks', 'Missed Tasks', 'Pending Tasks'],
        datasets: [{
            label: "Task Analytics",
            data: [data.done, data.missed, data.pending],
            backgroundColor: [
                '#219C90',
                '#D83F31',
                '#E9B824',
            ]
        },

        ]
    })

    useEffect(() => {
        setChartData({
            labels: ['Completed Tasks', 'Missed Tasks', 'Pending Tasks'],
            datasets: [{
                label: "Task Analytics",
                data: [data.done, data.missed, data.pending],
                backgroundColor: [
                    '#219C90',
                    '#D83F31',
                    '#E9B824',
                ]
            },

            ]
        })
    }, [data]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
                <Typography variant="h6">Task Analytics</Typography>
                <div style={{ width: "70%", display: "flex", justifyContent: "center" }}>
                    <PieChart ChartData={chartData} />
                </div>
            </Stack>
        </div>
    );
};

export default TaskPieChart;
