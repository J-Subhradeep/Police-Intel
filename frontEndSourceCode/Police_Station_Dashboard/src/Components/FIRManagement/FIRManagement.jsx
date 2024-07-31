import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Grid } from '@mui/material'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import FIRManagementMain from './Submodules/FIRManagementMain'

const FIRManagement = () => {
  return (
    <div>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar />
        </Grid>

        <Grid item xs={9.5}>
          <FIRManagementMain />
        </Grid>
      </Grid>
    </div>
  )
}

export default FIRManagement