import React, { useEffect, useState } from 'react';
import BarChart from '../../ChartTemplates/BarChart';
import { VisitorsData, ReviewsData } from '../Data';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';


const DailyVisitorsAndReviewsCount = ({getDailyVisitorsAndReviewCountArray}) => {

    console.log(getDailyVisitorsAndReviewCountArray)
    console.log(getDailyVisitorsAndReviewCountArray.map((data) => data.visitorCount))
    console.log(getDailyVisitorsAndReviewCountArray.map((data) => data.reviewCount))

    const [chartData, setChartData] = useState({
        labels: getDailyVisitorsAndReviewCountArray.map((data) => data.date),
        datasets: [{
            label: "Visitors Per Day",
            data: getDailyVisitorsAndReviewCountArray.map((data) => data.visitorCount),
            backgroundColor: [
                '#016fc4',
            ]
        },
        {
            label: "Reviews Per Day",
            data: getDailyVisitorsAndReviewCountArray.map((data) => data.reviewCount),
            backgroundColor: [
                '#50e3c2',
            ]
        }

        ]
    })

    useEffect(() => {
        setChartData({
            labels: getDailyVisitorsAndReviewCountArray.map((data) => data.date),
            datasets: [{
                label: "Visitors Per Day",
                data: getDailyVisitorsAndReviewCountArray.map((data) => data.visitorCount),
                backgroundColor: [
                    '#016fc4',
                ]
            },
            {
                label: "Reviews Per Day",
                data: getDailyVisitorsAndReviewCountArray.map((data) => data.reviewCount),
                backgroundColor: [
                    '#50e3c2',
                ]
            }
    
            ]
        })
  }, [getDailyVisitorsAndReviewCountArray]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '70px'}}>
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
                <Typography variant="h6">Daily Visitors and Feedback Count</Typography>
                <BarChart ChartData={chartData} />
            </Stack>
        </div>
    );
};

export default DailyVisitorsAndReviewsCount;
