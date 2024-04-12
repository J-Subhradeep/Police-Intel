import React from "react";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import { Navbar } from "../Navbar/Navbar";
import { Grid } from "@mui/material";
import DailyWorkItemsMain from "./submodules/DailyWorkItemsMain";

const DailyWorkItems = () => {
  return (
    <div >
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar currentItem='workItems'/>
        </Grid>

        <Grid item xs={9.5} >
            <DailyWorkItemsMain/>
        </Grid>
      </Grid>
    </div>
  );
};

export default DailyWorkItems;
