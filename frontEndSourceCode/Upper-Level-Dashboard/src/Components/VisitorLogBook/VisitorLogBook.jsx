import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Grid } from '@mui/material'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import { VisitorLogBookMain } from './Submodules/VisitorLogBookMain'

const VisitorLogBook = () => {
    return (
        <div>
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={2.5}>
                    <LeftSideBar currentItem='visitorLogBook' />
                </Grid>
                <Grid item xs={9.5}>
                    <VisitorLogBookMain />
                </Grid>
            </Grid>
        </div>
    )
}

export default VisitorLogBook