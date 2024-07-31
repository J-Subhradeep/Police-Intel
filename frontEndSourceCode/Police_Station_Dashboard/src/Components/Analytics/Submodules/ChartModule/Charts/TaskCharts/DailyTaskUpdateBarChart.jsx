import React, { useEffect, useState } from 'react';
import BarChart from '../../ChartTemplates/BarChart';
import { VisitorsData, ReviewsData } from '../Data';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';


const DailyTaskUpdateBarChart = ({getDailyTaskArray}) => {

    console.log(getDailyTaskArray)

    const [chartData, setChartData] = useState({
        labels: getDailyTaskArray.map((data) => data.date),
        datasets: [{
            label: "Task Given",
            data: getDailyTaskArray.map((data) => data.total_tasks),
            backgroundColor: [
                '#016fc4',
            ]
        },
        {
            label: "Tasks Completed",
            data: getDailyTaskArray.map((data) => data.done_tasks),
            backgroundColor: [
                '#50e3c2',
            ]
        },
        {
            label: "Tasks Pending",
            data: getDailyTaskArray.map((data) => data.pending_tasks),
            backgroundColor: [
                '#E9B824',
            ]
        },
        {
            label: "Tasks Missed",
            data: getDailyTaskArray.map((data) => data.missed_tasks),
            backgroundColor: [
                '#D83F31',
            ]
        },

        ]
    })

    useEffect(() => {
        setChartData({
            labels: getDailyTaskArray.map((data) => data.date),
            datasets: [{
                label: "Task Given",
                data: getDailyTaskArray.map((data) => data.total_tasks),
                backgroundColor: [
                    '#016fc4',
                ]
            },
            {
                label: "Tasks Completed",
                data: getDailyTaskArray.map((data) => data.done_tasks),
                backgroundColor: [
                    '#50e3c2',
                ]
            },
            {
                label: "Tasks Pending",
                data: getDailyTaskArray.map((data) => data.pending_tasks),
                backgroundColor: [
                    '#E9B824',
                ]
            },
            {
                label: "Tasks Missed",
                data: getDailyTaskArray.map((data) => data.missed_tasks),
                backgroundColor: [
                    '#D83F31',
                ]
            },
    
            ]
        })
  }, [getDailyTaskArray]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '70px'}}>
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
                <Typography variant="h6">Daily Task Details</Typography>
                <BarChart ChartData={chartData} />
            </Stack>
        </div>
    );
};

export default DailyTaskUpdateBarChart;
