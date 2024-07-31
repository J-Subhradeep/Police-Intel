import React from 'react'
import { Grid } from '@mui/material'
import FIRManagementMain from './Submodules/FIRManagementMain'
import Navbar from '../Common/Navbar/Navbar'
import LeftSideBar from '../Common/LeftSideBar/LeftSideBar'

const FIRManagement = () => {
  return (
    <div>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar currentItem='fir'/>
        </Grid>

        <Grid item xs={9.5}>
          <FIRManagementMain />
        </Grid>
      </Grid>
    </div>
  )
}

export default FIRManagement;