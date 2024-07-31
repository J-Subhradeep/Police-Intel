import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import AnalyticsButton from './AnalyticsButton';
import ComingSoonDialog from '../../../Common/ComingSoonDialog/ComingSoonDialog';

const AnalyticsPageMain = () => {
  
const [comingSoonDialogOpen, setComingSoonDialogOpen] = useState(false)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 4.3rem)' }}>
      <Grid container spacing={10} justifyContent="center">
        <Grid item>
          <AnalyticsButton name={"FIR Analytics"} path={"/analytics/FIR-analytics"} />
        </Grid>
        <Grid item>
          <AnalyticsButton name={"Task Analytics"} path={"/analytics/task-analytics"} />
        </Grid>
        <Grid item>
          <AnalyticsButton name={"Feedback Analytics"} path={"/analytics/feedback-analytics"} />
        </Grid>
        <Grid item>
          <div onClick={()=> setComingSoonDialogOpen(true)}>
            <AnalyticsButton name={"Performance Analytics"} path={"/analytics"} />
          </div>
        </Grid>
      </Grid>
      <ComingSoonDialog comingSoonDialogClose={()=>setComingSoonDialogOpen(false)} comingSoonDialogOpen={comingSoonDialogOpen} message={"Performance Analytics will be available soon"} />
    </div>
  );
};

export default AnalyticsPageMain;
