import React from 'react'
import ReviewAnalyticsMain from './Submodules/ReviewAnalyticsMain'
import { Navbar } from '../Navbar/Navbar'
import { Grid } from '@mui/material'
import LeftSideBar from '../LeftSideBar/LeftSideBar'

const ReviewAnalytics = () => {
    return (
        <div>
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={2.5}>
                    <LeftSideBar currentItem='analytics' />
                </Grid>
                <Grid item xs={9.5}>
                    <ReviewAnalyticsMain />
                </Grid>
            </Grid>
        </div>
    )
}

export default ReviewAnalytics