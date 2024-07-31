import React from 'react'
import EnterVisitorDetailsMain from './Submodules/EnterVisitorDetailsMain'
import { Grid } from '@mui/material'
import Navbar from '../../Common/Navbar/Navbar'
import LeftSideBar from '../../Common/LeftSideBar/LeftSideBar'

const EnterVisitorDetails = () => {
    return (
        <div>
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={2.5}>
                    <LeftSideBar currentItem='visitor-logbook' />
                </Grid>
                <Grid item xs={9.5}>
                    <EnterVisitorDetailsMain />
                </Grid>
            </Grid>
        </div>
    )
}

export default EnterVisitorDetails