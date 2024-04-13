import React from "react";
import FileFIRmain from "./Submodules/FileFIRmain";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import { Navbar } from "../Navbar/Navbar";
import { Grid } from "@mui/material";

const FileFIR = () => {
  return (
    <div>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar />
        </Grid>

        <Grid item xs={9.5}>
          <FileFIRmain />
        </Grid>
      </Grid>
    </div>
  );
};

export default FileFIR;
