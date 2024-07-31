import React from "react";
import { Grid } from "@mui/material";
import LeftSideBar from "../../Common/LeftSideBar/LeftSideBar";
import Navbar from "../../Common/Navbar/Navbar";
import FileFIRMain from "./Submodules/FileFIRMain";

const FileFIR = () => {
  return (
    <div>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar currentItem='fir'/>
        </Grid>

        <Grid item xs={9.5}>
          <FileFIRMain />
        </Grid>
      </Grid>
    </div>
  );
};

export default FileFIR;
