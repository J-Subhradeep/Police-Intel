import React from 'react'
import AddTaskMain from './Submodules/AddTaskMain'
import { Navbar } from '../Navbar/Navbar'
import { Grid } from '@mui/material'
import LeftSideBar from '../LeftSideBar/LeftSideBar'

const AddTask = () => {
  return (
    <div>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar />
        </Grid>

        <Grid item xs={9.5}>
          <AddTaskMain />
        </Grid>
      </Grid>
    </div>
  )
}

export default AddTask