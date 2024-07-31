import React from 'react'
import { Grid } from '@mui/material'
import TaskAnalyticsMain from './Submodules/TaskAnalyticsMain'
import LeftSideBar from '../../../Common/LeftSideBar/LeftSideBar'
import Navbar from '../../../Common/Navbar/Navbar'

const TaskAnalytics = () => {
    return (
        <div>
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={2.5}>
                    <LeftSideBar currentItem='analytics' />
                </Grid>
                <Grid item xs={9.5}>
                    <TaskAnalyticsMain />
                </Grid>
            </Grid>
        </div>
    )
}

export default TaskAnalytics