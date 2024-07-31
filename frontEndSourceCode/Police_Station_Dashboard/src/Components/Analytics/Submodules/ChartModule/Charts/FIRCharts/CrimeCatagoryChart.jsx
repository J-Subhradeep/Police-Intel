import React, { useEffect, useState } from 'react';
import BarChart from '../../ChartTemplates/BarChart';
import { VisitorsData, ReviewsData } from '../Data';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { analyticsColorPallet } from '../../../../../../GlobalConfig/config';

const dummyData = [
    {
        title: "ASSAULT", num: 10
    },
    {
        title: "BURGLARY", num: 7
    },
    {
        title: "CRIMINAL DAMAGE", num: 5
    },
    {
        title: "DECEPTIVE PRACTICE", num: 5
    },
    {
        title: "HOMICIDE", num: 3
    },
    {
        title: "KIDNAPPING", num: 8
    },
    {
        title: "SEX OFFENSE", num: 3
    },
]


const CrimeCatagoryChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const labels = dummyData.map(data => data.title);
        const dataValues = dummyData.map(data => data.num);
        const backgroundColors = analyticsColorPallet.slice(0, dummyData.length);

        const datasets = [{
            label: null,
            data: dataValues,
            backgroundColor: backgroundColors,
        }];

        setChartData({ labels, datasets });
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '70px' }}>
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
                <Typography variant="h6">Crime Category Wise Analytics</Typography>
                <BarChart ChartData={chartData} options={{
                    plugins: {
                        legend: {
                            display: false // Disable the legend
                        }
                    }
                }} />
            </Stack>
        </div>
    );
};


export default CrimeCatagoryChart