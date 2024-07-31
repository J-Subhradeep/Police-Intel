import React, { useEffect, useState } from 'react';
// import PieChart from '../ChartTemplates/PieChart';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';


const Ratings = ({ ratings }) => {

    console.log(ratings)

    const [ratingData, setRatingsData] = useState({})

    useEffect(() => {
        setRatingsData(ratings)
    }, [ratings]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '70px' }}>
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
                <Typography variant="h6">Ratings</Typography>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Rating size='large' name="read-only" value={1} readOnly /> <div style={{ fontFamily: "sans-serif" , marginLeft: '20px' }}>{ratingData.one}</div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Rating size='large' name="read-only" value={2} readOnly /> <div style={{ fontFamily: "sans-serif" , marginLeft: '20px' }}>{ratingData.two}</div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Rating size='large' name="read-only" value={3} readOnly /> <div style={{ fontFamily: "sans-serif" , marginLeft: '20px' }}>{ratingData.three}</div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Rating size='large' name="read-only" value={4} readOnly /> <div style={{ fontFamily: "sans-serif" , marginLeft: '20px' }}>{ratingData.four}</div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Rating size='large' name="read-only" value={5} readOnly /> <div style={{ fontFamily: "sans-serif" , marginLeft: '20px' }}>{ratingData.five}</div>
                </div>
            </Stack>
        </div>
    );
};

export default Ratings
