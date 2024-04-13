import React from "react";
import { Box, Button, Grid, Typography } from '@mui/material';
import { Navbar } from '../Navbar/Navbar'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import SelectPoliceStationMain from "./Submodules/SelectPoliceStationMain";

const SelectPoliceStation = ({url}) => {
    return(
    <div style={{width: "100%"}}>
        <SelectPoliceStationMain url={url}/>
    </div>
    );
}

export default SelectPoliceStation;