import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid } from '@mui/material';

const FIRDetails = () => {
  const [firDetails, setFIRDetails] = useState(null);

  // Dummy FIR data
  const dummyFIRData = {
    investigatingOfficer: 'John Doe',
    policeStation: 'Central Police Station',
    occurrenceDateTimeFrom: '2024-03-14T10:00',
    occurrenceDateTimeTo: '2024-03-14T11:00',
    crimeType: 'Heinous',
    actSection: 'Section 420',
    placeOfOffence: 'Main Street',
    accused: [
      { name: 'Alice', gender: 'Female', age: 30, occupation: 'Engineer' },
      { name: 'Bob', gender: 'Male', age: 35, occupation: 'Teacher' }
    ],
    victims: [
      { name: 'Charlie', gender: 'Male', age: 25, occupation: 'Student' },
      { name: 'Diana', gender: 'Female', age: 40, occupation: 'Doctor' }
    ],
    complainantName: 'Eve',
    firDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et ligula et nulla cursus scelerisque. Duis vel volutpat risus. Proin nec nisi nisl. Suspendisse potenti. Nulla facilisi. Quisque malesuada congue diam, eget ullamcorper elit feugiat nec. Mauris ac nisi eu lacus interdum pretium. Sed ut vestibulum ipsum.'
  };

  useEffect(() => {
    // Simulate fetching FIR details from backend
    // Replace this with actual API call in your application
    setTimeout(() => {
      setFIRDetails(dummyFIRData);
    }, 1000);
  }, []);

  return (
    <Paper elevation={3} style={{ padding: 20, maxWidth: 800, margin: 'auto', marginTop: 20,marginBottom: 80}}>
      <Typography variant="h5" gutterBottom>
        FIR Details
      </Typography>

      {firDetails ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Investigating Officer
            </Typography>
            <Typography>{firDetails.investigatingOfficer}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Police Station
            </Typography>
            <Typography>{firDetails.policeStation}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Occurrence Date and Time (From)
            </Typography>
            <Typography>{firDetails.occurrenceDateTimeFrom}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Occurrence Date and Time (To)
            </Typography>
            <Typography>{firDetails.occurrenceDateTimeTo}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Crime Type
            </Typography>
            <Typography>{firDetails.crimeType}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Act Section
            </Typography>
            <Typography>{firDetails.actSection}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Place of Offence
            </Typography>
            <Typography>{firDetails.placeOfOffence}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Accused Details
            </Typography>
            {firDetails.accused.map((accusedPerson, index) => (
              <div style={{marginBottom: '10px'}} key={index}>
                <Typography variant="subtitle1">Accused {index + 1}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Typography>Name: {accusedPerson.name}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Gender: {accusedPerson.gender}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Age: {accusedPerson.age}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Occupation: {accusedPerson.occupation}</Typography>
                  </Grid>
                </Grid>
              </div>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Victim Details
            </Typography>
            {firDetails.victims.map((victim, index) => (
              <div style={{marginBottom: '10px'}} key={index}>
                <Typography variant="subtitle1">Victim {index + 1}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Typography>Name: {victim.name}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Gender: {victim.gender}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Age: {victim.age}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                  <Typography>Occupation: {victim.occupation}</Typography>
                  </Grid>
                </Grid>
              </div>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Complainant Name
            </Typography>
            <Typography>{firDetails.complainantName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              FIR Description
            </Typography>
            <Typography>{firDetails.firDescription}</Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography>Loading FIR details...</Typography>
      )}
    </Paper>
  );
};

export default FIRDetails;
