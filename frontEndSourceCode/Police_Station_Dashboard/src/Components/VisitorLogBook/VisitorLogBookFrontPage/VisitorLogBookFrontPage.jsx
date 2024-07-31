import React from 'react'
import { Grid } from '@mui/material'
import { VisitorLogBookFrontPageMain, } from './Submodules/VisitorLogBookFrontPageMain'
import Navbar from '../../Common/Navbar/Navbar'
import LeftSideBar from '../../Common/LeftSideBar/LeftSideBar'

const VisitorLogBookFrontPage = () => {
    return (
        <div>
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={2.5}>
                    <LeftSideBar currentItem='visitor-logbook' />
                </Grid>
                <Grid item xs={9.5}>
                    <VisitorLogBookFrontPageMain />
                </Grid>
            </Grid>
        </div>
    )
}

export default VisitorLogBookFrontPage