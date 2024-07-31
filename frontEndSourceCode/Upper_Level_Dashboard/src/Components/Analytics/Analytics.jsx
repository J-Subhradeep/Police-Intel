import React from 'react'
import { Grid } from '@mui/material'
import Navbar from '../Common/Navbar/Navbar'
import LeftSideBar from '../Common/LeftSideBar/LeftSideBar'
import AnalyticsPageMain from './Submodules/FrontPage/AnalyticsMain'

const Analytics = () => {
    return (
        <div>
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={2.5}>
                    <LeftSideBar currentItem='analytics' />
                </Grid>
                <Grid item xs={9.5}>
                    <AnalyticsPageMain />
                </Grid>
            </Grid>
        </div>
    )
}

export default Analytics