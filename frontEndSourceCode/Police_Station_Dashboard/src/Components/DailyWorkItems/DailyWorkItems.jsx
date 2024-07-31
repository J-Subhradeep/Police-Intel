import React from "react";
import { Grid } from "@mui/material";
import DailyWorkItemsMain from "./submodules/DailyWorkItemsMain";
import LeftSideBar from "../Common/LeftSideBar/LeftSideBar";
import Navbar from "../Common/Navbar/Navbar";

const DailyWorkItems = () => {
  return (
    <div >
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar currentItem='work-update'/>
        </Grid>

        <Grid item xs={9.5} >
            <DailyWorkItemsMain/>
        </Grid>
      </Grid>
    </div>
  );
};

export default DailyWorkItems;
