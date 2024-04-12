import React from 'react';
import FIRListingMain from './SubModules/FIRListMain';
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import {Navbar} from "../Navbar/Navbar";
import { Grid } from "@mui/material";



const FIRs = [
    {date:'04.12.23' ,id: 1, description: 'FIR Description 1 : Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate vero debitis, eius at ab quaerat laboriosam architecto nulla exercitationem adipisci iusto alias veritatis ipsam. Sunt cum dignissimos similique repellendus.',status:'pending' },
    {date:'04.12.23', id: 2, description: 'FIR Description 2 :Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate vero debitis, eius at ab quaerat laboriosam architecto nulla exercitationem adipisci iusto alias veritatis ipsam. Sunt cum dignissimos similique repellendus.',status:'pending' },
    { date:'04.12.23',id: 3, description: 'FIR Description 3:Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate vero debitis, eius at ab quaerat laboriosam architecto nulla exercitationem adipisci iusto alias veritatis ipsam. Sunt cum dignissimos similique repellendus.',status:'pending' },
    {date:'04.12.23', id: 4, description: 'FIR Description 4:Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate vero debitis, eius at ab quaerat laboriosam architecto nulla exercitationem adipisci iusto alias veritatis ipsam. Sunt cum dignissimos similique repellendus.',status:'pending' },
    { date:'04.12.23',id: 5, description: 'FIR Description 5:Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate vero debitis, eius at ab quaerat laboriosam architecto nulla exercitationem adipisci iusto alias veritatis ipsam. Sunt cum dignissimos similique repellendus.',status:'pending' },
    { date:'04.12.23',id: 6, description: 'FIR Description 6:Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate vero debitis, eius at ab quaerat laboriosam architecto nulla exercitationem adipisci iusto alias veritatis ipsam. Sunt cum dignissimos similique repellendus.',status:'pending' },
  ];
  
function FIRList() {
  return (
    <div>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          <LeftSideBar />
        </Grid>

        <Grid item xs={9.5}>
          <FIRListingMain FIRs = {FIRs} />
        </Grid>
      </Grid>
    </div>
  );
}

export default FIRList;
