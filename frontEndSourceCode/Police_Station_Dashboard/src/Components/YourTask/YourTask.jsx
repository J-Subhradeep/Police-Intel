import React from "react";
import { Grid } from "@mui/material";
import LeftSideBar from "../Common/LeftSideBar/LeftSideBar";
import Navbar from "../Common/Navbar/Navbar";
import YourTaskMain from "./Submodules/YourTaskMain";

const YourTask = () => {
  return (
    <div >
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar currentItem='your-task'/>
        </Grid>

        <Grid item xs={9.5} >
            <YourTaskMain />
        </Grid>
      </Grid>
    </div>
  );
};

export default YourTask;
