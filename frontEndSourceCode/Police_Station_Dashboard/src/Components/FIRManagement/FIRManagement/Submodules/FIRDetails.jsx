import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';

const FIRDetails = ({ firDetails }) => {

  return (
    <Paper elevation={3} style={{ padding: 20, maxWidth: 800, margin: 'auto', marginTop: 20, marginBottom: 80 }}>
      <Typography variant="h5" gutterBottom>
        FIR Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            FIR ID
          </Typography>
          <Typography>{firDetails.id}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Investigating Officer
          </Typography>
          <Typography>{firDetails.io_name}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Police Station
          </Typography>
          <Typography>{firDetails.ps_name}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Submission Date and Time
          </Typography>
          <Typography>{firDetails.submissionTime}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Occurrence Date and Time (From)
          </Typography>
          <Typography>{firDetails.occurrence_date_time_from}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Occurrence Date and Time (To)
          </Typography>
          <Typography>{firDetails.occurrence_date_time_to}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Crime Type
          </Typography>
          <Typography>{firDetails.fir_type}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Crime Catagory
          </Typography>
          {
            firDetails.crime_catagory_list.map((catagory, index) => (
              <Typography key={index}>{catagory}</Typography>
            ))}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Act Section
          </Typography>
          <Typography>{firDetails.act_section}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Place of Offence
          </Typography>
          <Typography>{firDetails.place_of_incident}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Accused Details
          </Typography>
          {firDetails.accused_list.map((accusedPerson, index) => (
            <div style={{ marginBottom: '10px' }} key={index}>
              <Typography variant="subtitle1">Accused {index + 1}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography>Accused Number: {accusedPerson.accused_number}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>Name: {accusedPerson.accused_name}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>Gender: {accusedPerson.accused_gender}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>Age: {accusedPerson.accused_age}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>Occupation: {accusedPerson.accused_job}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>Occupation: {accusedPerson.accused_social_catagory}</Typography>
                </Grid>
              </Grid>
            </div>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Victim Details
          </Typography>
          {firDetails.victim_list.map((victim, index) => (
            <div style={{ marginBottom: '10px' }} key={index}>
              <Typography variant="subtitle1">Victim {index + 1}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography>Number: {victim.victim_number}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>Name: {victim.victim_name}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>Gender: {victim.victim_gender}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>Age: {victim.victim_age}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>Occupation: {victim.victim_job}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>Social Catagory: {victim.victim_social_catagory}</Typography>
                </Grid>
              </Grid>
            </div>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Complainant Name
          </Typography>
          <Typography>{firDetails.complainant_name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            FIR Description
          </Typography>
          <Typography>{firDetails.description}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FIRDetails;
