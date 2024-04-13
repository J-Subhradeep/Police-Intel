import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Grid } from '@mui/material'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import FIRManagementMain from './Submodules/FIRManagementMain'
import { useParams } from 'react-router-dom';

const ManageFIR = () => {
  const { id } = useParams();
  return (
    <div>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar />
        </Grid>

        <Grid item xs={9.5}>
          <FIRManagementMain firID={parseInt(id)} />
        </Grid>
      </Grid>
    </div>
  )
}

export default ManageFIR;