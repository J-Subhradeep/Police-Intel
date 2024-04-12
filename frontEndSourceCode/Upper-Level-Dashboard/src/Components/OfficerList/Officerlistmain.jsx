import React from "react";
import OfficerList from "./Submodules/Officerlist";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import { Navbar } from "../Navbar/Navbar";
import { Grid } from "@mui/material";

const OfficerListmain = () => {
  return (
    <div >
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar currentItem='officerList'/>
        </Grid>

        <Grid item xs={9.5} >
            <OfficerList />
        </Grid>
      </Grid>
    </div>
  );
};

export default OfficerListmain;