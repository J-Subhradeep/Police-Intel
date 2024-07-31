import React from "react";
import { Grid} from '@mui/material';
import FIRFrontpagemain from "./Submodules/FIRFrontpagemain";
import LeftSideBar from "../../Common/LeftSideBar/LeftSideBar";
import Navbar from "../../Common/Navbar/Navbar";

const FIRFrontpage = () => {
    return(
    <div>
        <Navbar />
        <Grid container spacing={0}>
            <Grid item xs={2.5}>
                <LeftSideBar currentItem='fir' />
            </Grid>
            <Grid item xs={9.5}>
                <FIRFrontpagemain />
            </Grid>
        </Grid>
    </div>
    );
}

export default FIRFrontpage;