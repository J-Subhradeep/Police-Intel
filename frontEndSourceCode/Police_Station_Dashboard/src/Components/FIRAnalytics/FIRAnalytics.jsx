import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Grid } from '@mui/material'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import FIRAnalyticsMain from './submodules/FIRAnalyticsMain'

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