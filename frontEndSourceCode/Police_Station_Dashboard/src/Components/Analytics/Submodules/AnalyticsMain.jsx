import React from 'react';
import { Grid, Button } from '@mui/material';
import AnalyticsButton from './AnalyticsButton';



const AnalyticsPageMain = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 4.3rem)' }}>
      <Grid container spacing={10} justifyContent="center">
        <Grid item>
          <AnalyticsButton name={"Performance Analytics"} />
        </Grid>
        <Grid item>
          <AnalyticsButton name={"FIR Analytics"} path={"/analytics/FIRAnalytics"} />
        </Grid>
        <Grid item>
          <AnalyticsButton name={"Task Analytics"} path={"/analytics/taskAnalytics"}/>
        </Grid>
        <Grid item>
          <AnalyticsButton name={"Feedback Analytics"} path={"/analytics/feedbackAnalytics"} />
        </Grid>
      </Grid>
    </div>
  );
};

export default AnalyticsPageMain;
