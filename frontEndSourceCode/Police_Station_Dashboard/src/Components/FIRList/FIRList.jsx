import React from 'react';
import FIRListingMain from './SubModules/FIRListMain';
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import {Navbar} from "../Navbar/Navbar";
import { Grid } from "@mui/material";



const FIRs = [
    {date:'04.12.23' ,id: 1, filedBy: 'Ramesh Kumar',status:'pending' },
    {date:'04.12.23', id: 2, filedBy: 'Anupam Roy',status:'pending' },
    { date:'04.12.23',id: 3, filedBy: 'Aditi Mishra',status:'pending' },
    {date:'04.12.23', id: 4, filedBy: 'Pinki',status:'pending' },
    { date:'04.12.23',id: 5, filedBy: 'Gopal',status:'pending' },
    { date:'04.12.23',id: 6, filedBy: 'Ratan',status:'pending' },
  ];
  
function FIRList() {
  return (
    <div>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar currentItem='firfrontpage'/>
        </Grid>

        <Grid item xs={9.5}>
          <FIRListingMain FIRs = {FIRs} />
        </Grid>
      </Grid>
    </div>
  );
}

export default FIRList;
