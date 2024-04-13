import React from 'react'
import EnterVisitorDetailsMain from './Submodules/EnterVisitorDetailsMain'
import { Navbar } from '../Navbar/Navbar'
import { Grid } from '@mui/material'
import LeftSideBar from '../LeftSideBar/LeftSideBar'

const EnterVisitorDetails = () => {
    return (
        <div>
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={2.5}>
                    <LeftSideBar currentItem='visitorLogBook' />
                </Grid>
                <Grid item xs={9.5}>
                    <EnterVisitorDetailsMain />
                </Grid>
            </Grid>
        </div>
    )
}

export default EnterVisitorDetails