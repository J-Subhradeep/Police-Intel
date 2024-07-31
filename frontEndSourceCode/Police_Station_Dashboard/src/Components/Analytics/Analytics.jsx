import React from 'react'
import AnalyticsMain from './Submodules/FrontPage/AnalyticsMain'
import { Grid } from '@mui/material'
import Navbar from '../Common/Navbar/Navbar'
import LeftSideBar from '../Common/LeftSideBar/LeftSideBar'

const Analytics = () => {
    return (
        <div>
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={2.5}>
                    <LeftSideBar currentItem='analytics' />
                </Grid>
                <Grid item xs={9.5}>
                    <AnalyticsMain />
                </Grid>
            </Grid>
        </div>
    )
}

export default Analytics