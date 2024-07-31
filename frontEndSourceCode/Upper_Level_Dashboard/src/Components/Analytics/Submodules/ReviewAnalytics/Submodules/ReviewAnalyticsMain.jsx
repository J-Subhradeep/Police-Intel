import React, { useEffect, useState } from 'react';
import { Typography, TextField, Box, IconButton, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from "@mui/icons-material/Search";
import Ratings from '../../ChartModule/Charts/Ratings';
import { getDefaultEndDate, getDefaultStartDate } from '../Utilities/Functions';
import { getDailyVisitorsAndReviewCount, positiveAndNegativeReviewsCount, ratingsCount } from '../Utilities/Queries';
import DailyVisitorsAndReviewsCount from '../../ChartModule/Charts/FeedbackCharts/DailyVisitorsAndReviewsCount';
import PositiveAndNegativeReviews from '../../ChartModule/Charts/FeedbackCharts/PositiveAndNegativeReviews';
import SelectPoliceStation from '../../../../Common/SelectPoliceStation/SelectPoliceStation';

const ReviewAnalyticsMain = () => {

    const [showCharts, setShowCharts] = useState(false)
    const [getDailyVisitorsAndReviewCountArray, setGetDailyVisitorsAndReviewCountArray] = useState([]);
    const [positivity, setPositivity] = useState({});
    const [startDate, setStartDate] = useState(getDefaultStartDate());
    const [endDate, setEndDate] = useState(getDefaultEndDate());

    const handleSubmit = (event) => {
        getDailyVisitorsAndReviewCount(startDate, endDate, setGetDailyVisitorsAndReviewCountArray, setShowCharts);
        positiveAndNegativeReviewsCount(startDate, endDate, setPositivity, setShowCharts);
        ratingsCount(startDate, endDate, setRatings, setShowCharts);
        console.log('subbbbb')
    }    

    const [ratings, setRatings] = useState({})

    return (
        <div style={{ height: 'calc(100vh - 4.3rem)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'scroll', overflowX: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '80px', width: '100%', marginTop: '30px', paddingLeft: '30px' }}>
            <Typography variant="h5" gutterBottom>
                <IconButton aria-label="back">
                    <ArrowBackIcon />
                </IconButton>
                Feedback Analytics
            </Typography>
        </div>


        <div className='filter-section' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%', marginTop: '30px' }}>
            <SelectPoliceStation/>
            <Typography variant="h6">Filter Options</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px' }}>
                <Box sx={{ display: 'flex', gap: '16px', width: '100%' }}>
                    <TextField
                        id="start-date"
                        label="Start Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />

                    <TextField
                        id="end-date"
                        label="End Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </Box>
            </Box>
            <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSubmit}
            >
                Filter
            </Button>
        </div>

        {showCharts && (<div className='charts-section' style={{ marginTop: '40px' }}>
            <DailyVisitorsAndReviewsCount getDailyVisitorsAndReviewCountArray={getDailyVisitorsAndReviewCountArray} />
            <PositiveAndNegativeReviews positivity={positivity} />
            <Ratings ratings={ratings} />
        </div>)}
    </div>
    );
};

export default ReviewAnalyticsMain;
