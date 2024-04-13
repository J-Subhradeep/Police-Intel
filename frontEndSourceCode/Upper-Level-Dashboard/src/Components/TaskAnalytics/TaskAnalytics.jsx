import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Grid } from '@mui/material'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import TaskAnalyticsMain from './Submodules/TaskAnalyticsMain'

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