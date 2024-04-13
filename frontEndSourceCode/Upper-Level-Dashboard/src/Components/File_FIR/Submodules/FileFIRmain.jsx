import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  CssBaseline,
  Grid,
  Box,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SendIcon from "@mui/icons-material/Send";
import BadgeIcon from "@mui/icons-material/Badge";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

const FileFIRmain = () => {
  const [policeOfficerName, setPoliceOfficerName] = useState("");
  const [officerDesig, setOfficerDesig] = useState("");
  const [officerID, setOfficerID] = useState("");

  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  
  const [place, setPlace] = useState("");
  const [accusedName, setAccusedName] = useState("");
  const [complainantName, setComplainantName] = useState("");

  const [firType, setFirType] = useState("");
  const [actSection, setActSection] = useState("");
  const [crimeCategory, setCrimeCategory] = useState("");
  const [accusedGender, setAccusedGender] = useState("");
  const [accusedAge, setAccusedAge] = useState("");
  const [victimName, setVictimName] = useState("");
  const [victimGender, setVictimGender] = useState("");
  const [victimAge, setVictimAge] = useState("");

  const handlePoliceOfficerNameChange = (event) => {
    setPoliceOfficerName(event.target.value);
  };

  const handleOfficerDesigChange = (event) => {
    setOfficerDesig(event.target.value);
  };

  const handleOfficerIdChange = (event) => {
    setOfficerID(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateTimeChange = (event) => {
    setDateTime(event.target.value);
  };

  

  const handlePlaceChange = (event) => {
    setPlace(event.target.value);
  };

  const handleAccusedNameChange = (event) => {
    setAccusedName(event.target.value);
  };

  const handleComplainantNameChange = (event) => {
    setComplainantName(event.target.value);
  };

  const handleFirTypeChange = (event) => {
    setFirType(event.target.value);
  };

  const handleActSectionChange = (event) => {
    setActSection(event.target.value);
  };

  const handleCrimeCategoryChange = (event) => {
    setCrimeCategory(event.target.value);
  };

  const handleAccusedGenderChange = (event) => {
    setAccusedGender(event.target.value);
  };

  const handleAccusedAgeChange = (event) => {
    setAccusedAge(event.target.value);
  };

  const handleVictimNameChange = (event) => {
    setVictimName(event.target.value);
  };

  const handleVictimGenderChange = (event) => {
    setVictimGender(event.target.value);
  };

  const handleVictimAgeChange = (event) => {
    setVictimAge(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Submitting FIR");
    console.log("Police Officer Name:", policeOfficerName);
    console.log("Officer Post:", officerDesig);
    console.log("Officer ID:", officerID);
    console.log("Description:", description);
    console.log("Date-Time:", dateTime);
   
    console.log("Place:", place);
    console.log("Accused Name:", accusedName);
    console.log("Complainant Name:", complainantName);
    console.log("FIR Type:", firType);
    console.log("Act Section:", actSection);
    console.log("Crime Category:", crimeCategory);
    console.log("Gender of Accused:", accusedGender);
    console.log("Age of Accused:", accusedAge);
    console.log("Name of Victim:", victimName);
    console.log("Gender of Victim:", victimGender);
    console.log("Age of Victim:", victimAge);
    setPoliceOfficerName("");
    setOfficerDesig("");
    setDescription("");
    setDate("");
    setTime("");
    setPlace("");
    setAccusedName("");
    setComplainantName("");
    setFirType("");
    setActSection("");
    setCrimeCategory("");
    setAccusedGender("");
    setAccusedAge("");
    setVictimName("");
    setVictimGender("");
    setVictimAge("");
  };

  return (
    <div
      style={{
        height: "calc(100vh - 4.3rem)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          sx={{
            marginTop: "50px",
            marginBottom: "50px",
            textAlign: "left",
            width: "80%",
          }}
        >
          <Box
            sx={{ borderBottom: "2px solid #1976d2", marginBottom: "20px" }}
          >
            <Typography variant="h4" gutterBottom>
              File FIR
            </Typography>
          </Box>
          <Typography variant="h5" gutterBottom sx={{marginBottom:"20px"}}>
            Investigation Officer Details
          </Typography>
          <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label=" Name"
                variant="outlined"
                value={policeOfficerName}
                onChange={handlePoliceOfficerNameChange}
                InputProps={{
                  startAdornment: <AccountCircleIcon />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label=" Designation"
                variant="outlined"
                value={officerDesig}
                onChange={handleOfficerDesigChange}
                InputProps={{
                  startAdornment: <AssignmentIcon />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label=" ID"
                variant="outlined"
                value={officerID}
                onChange={handleOfficerIdChange}
                InputProps={{
                  startAdornment: <BadgeIcon />,
                }}
              />
            </Grid>
          </Grid>
          <Typography variant="h5" gutterBottom>
            FIR Description
          </Typography>
          <Typography variant="p" gutterBottom>
            Occurence Of Offence:
          </Typography>

          <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
          <Grid item xs={12} sm={6}>
                <Typography variant="p" sx={{fontSize:"12px"}}>From</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="datetime-local"
                  value={dateTime}
                  onChange={handleDateTimeChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="p" sx={{fontSize:"12px"}}>To</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="datetime-local"
                  value={dateTime}
                  onChange={handleDateTimeChange}
                />
              </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <Select
                  value={firType}
                  onChange={handleFirTypeChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled>
                    FIR Type
                  </MenuItem>
                  <MenuItem value="Heinous">Heinous</MenuItem>
                  <MenuItem value="Non-Heinous">Non-Heinous</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Act Section"
                variant="outlined"
                value={actSection}
                onChange={handleActSectionChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Crime Category"
                variant="outlined"
                value={crimeCategory}
                onChange={handleCrimeCategoryChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Place Of Incident"
                variant="outlined"
                value={place}
                onChange={handlePlaceChange}
              />
            </Grid>
            <Grid item xs={12}>
            <Typography variant="p">Accused Details:</Typography>
            </Grid>
            
            <Grid item xs={12} sm={4}>
            
              <TextField
                fullWidth
                label="Name "
                variant="outlined"
                value={accusedName}
                onChange={handleAccusedNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <RadioGroup
                row
                aria-label="accused-gender"
                name="accused-gender"
                value={accusedGender}
                onChange={handleAccusedGenderChange}
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Age of Accused"
                variant="outlined"
                type="number"
                value={accusedAge}
                onChange={handleAccusedAgeChange}
              />
            </Grid>
            <Grid item xs={12}><Typography variant="p">Victim Details:</Typography></Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Name of Victim"
                variant="outlined"
                value={victimName}
                onChange={handleVictimNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <RadioGroup
                row
                aria-label="victim-gender"
                name="victim-gender"
                value={victimGender}
                onChange={handleVictimGenderChange}
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Age of Victim"
                variant="outlined"
                type="number"
                value={victimAge}
                onChange={handleVictimAgeChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Complainant Name"
                variant="outlined"
                value={complainantName}
                onChange={handleComplainantNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
                InputProps={{
                  startAdornment: <AssignmentIcon />,
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            endIcon={<SendIcon />}
            sx={{ width: "auto" }}
          >
            Submit
          </Button>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default FileFIRmain;
