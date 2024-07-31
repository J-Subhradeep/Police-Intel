import React from "react";
import ViewTaskPage from "./Submodules/ViewTaskPage";
import { Grid } from "@mui/material";
import LeftSideBar from "../Common/LeftSideBar/LeftSideBar";
import Navbar from "../Common/Navbar/Navbar";

const ViewTask = () => {
  return (
    <div >
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar currentItem='your-tasks'/>
        </Grid>

        <Grid item xs={9.5} >
            <ViewTaskPage />
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewTask;
