import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Grid } from '@mui/material'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import TaskAssignmentMain from './Submodules/TaskAssignmentMain'

const TaskAssignment = () => {
  return (
    <div>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar currentItem='taskAssignment'/>
        </Grid>

        <Grid item xs={9.5}>
          <TaskAssignmentMain />
        </Grid>
      </Grid>
    </div>
  )
}

export default TaskAssignment