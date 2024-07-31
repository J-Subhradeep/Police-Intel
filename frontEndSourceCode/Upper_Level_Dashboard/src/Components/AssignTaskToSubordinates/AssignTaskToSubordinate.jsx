import React from 'react'
import { Grid } from '@mui/material'
import LeftSideBar from '../Common/LeftSideBar/LeftSideBar'
import Navbar from '../Common/Navbar/Navbar'
import AddTask from './AddTask'

const AssignTaskToSubordinate = () => {
  return (
    <div>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar currentItem='task-to-subordinates'/>
        </Grid>

        <Grid item xs={9.5}>
          <AddTask />
        </Grid>
      </Grid>
    </div>
  )
}

export default AssignTaskToSubordinate