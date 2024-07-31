import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid } from '@mui/material';

const FIRDetails = ({firId}) => {
  const [firDetails, setFIRDetails] = useState(null);

  // Dummy FIR data
  const dummyFIRData = {
    investigatingOfficer: 'John Doe',
    policeStation: 'Central Police Station',
    occurrenceDateTimeFrom: '2024-03-14T10:00',
    occurrenceDateTimeTo: '2024-03-14T11:00',
    crimeType: 'Heinous',
    crimeCatagory: "Murder",
    actSection: 'Section 420',
    placeOfOffence: 'Main Street',
    accused: [
      { name: 'Alice', gender: 'Female', age: 30, occupation: 'Engineer' },
      { name: 'Bob', gender: 'Male', age: 35, occupation: 'Teacher' }
    ],
    victims: [
      { name: 'Charlie', gender: 'Male', age: 25, occupation: 'Student' }
    ],
    complainantName: 'Eve',
    firDescription: "The murder of Charlie took place on April 1, 2024, at a secluded cabin in the woods. John Doe, a 35-year-old businessman, had rented the cabin for a weekend getaway. The perpetrator, who was lying in wait, ambushed John as he entered the cabin. Using a heavy object, likely a blunt instrument found at the scene, the perpetrator struck John on the head, causing fatal blunt force trauma. John, caught off guard, likely didn't have the chance to defend himself. The attack was swift and decisive, leaving him incapacitated and ultimately leading to his demise. The secluded location of the cabin ensured that there were no witnesses to the crime, allowing the perpetrator to carry out the murder without interruption. After the fatal blow was delivered, the perpetrator likely fled the scene, leaving behind the lifeless body of John Doe. The motive behind the murder remains unclear, but the brutality of the attack suggests a personal grudge or deep-seated animosity towards the victim."
  };

  useEffect(() => {
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
              Crime Catagory
            </Typography>
            <Typography>{firDetails.crimeCatagory}</Typography>
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
