import React from "react";
import { Box, Button, Grid, Typography } from '@mui/material';
import FIRFrontpagemain from "./Submodules/FIRFrontpagemain";
import { Navbar } from '../Navbar/Navbar'
import LeftSideBar from '../LeftSideBar/LeftSideBar'

const FIRFrontpage = () => {
    return(
    <div>
        <Navbar />
        <Grid container spacing={0}>
            <Grid item xs={2.5}>
                <LeftSideBar currentItem='firfrontpage' />
            </Grid>
            <Grid item xs={9.5}>
                <FIRFrontpagemain />
            </Grid>
        </Grid>
    </div>
    );
}

export default FIRFrontpage;