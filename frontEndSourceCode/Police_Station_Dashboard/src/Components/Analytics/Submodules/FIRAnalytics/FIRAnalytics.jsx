import React from 'react'
import { Grid } from '@mui/material'
import FIRAnalyticsMain from './submodules/FIRAnalyticsMain'
import LeftSideBar from '../../../Common/LeftSideBar/LeftSideBar'
import Navbar from '../../../Common/Navbar/Navbar'

const FIRAnalytics = () => {
    return (
        <div>
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={2.5}>
                    <LeftSideBar currentItem='analytics' />
                </Grid>
                <Grid item xs={9.5}>
                    <FIRAnalyticsMain />
                </Grid>
            </Grid>
        </div>
    )
}

export default FIRAnalytics