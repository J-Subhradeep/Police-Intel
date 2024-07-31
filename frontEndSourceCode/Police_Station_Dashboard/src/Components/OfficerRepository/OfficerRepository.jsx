import React from "react";
import { Grid } from "@mui/material";
import Navbar from "../Common/Navbar/Navbar";
import LeftSideBar from "../Common/LeftSideBar/LeftSideBar";
import OfficerRepositoryMain from "./Submodules/OfficerRepositoryMain";

const OfficerRepository = () => {
  return (
    <div >
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar currentItem='officers'/>
        </Grid>

        <Grid item xs={9.5} >
            <OfficerRepositoryMain />
        </Grid>
      </Grid>
    </div>
  );
};

export default OfficerRepository;