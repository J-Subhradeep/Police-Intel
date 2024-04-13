import React from "react";
import ViewTaskPage from "./Submodules/ViewTaskPage";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import { Navbar } from "../Navbar/Navbar";
import { Grid } from "@mui/material";

const ViewTask = () => {
  return (
    <div >
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar currentItem='taskAssignment'/>
        </Grid>

        <Grid item xs={9.5} >
            <ViewTaskPage />
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewTask;
