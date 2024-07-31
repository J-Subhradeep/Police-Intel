import { useState } from "react";
import { TextField, Button, Container, Typography, CssBaseline, Grid, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SendIcon from "@mui/icons-material/Send";
import { theme, getOfficer, getActSection, getAICatagory, addFirFunc } from "../Utilities/Utilities";
import IODetails from "./IODetails";
import OccuranceOfOffence from "./OccuranceOfOffence";
import AccusedDetails from "./AccusedDetails";
import VictimdDetails from "./VictimDetails";
import CrimeCatagory from "./CrimeCatagory";
import ActSection from "./ActSection";
import DialogComponent from "./DialogComponent";

const FileFIRMain = () => {
  const [policeOfficerName, setPoliceOfficerName] = useState("");
  const [officerDesig, setOfficerDesig] = useState("");
  const [officerID, setOfficerID] = useState("");
  const [description, setDescription] = useState("");
  const [dateTimeFrom, setDateTimeFrom] = useState("");
  const [dateTimeTo, setDateTimeTo] = useState("");
  const [place, setPlace] = useState("");
  const [complainantName, setComplainantName] = useState("");
  const [complainantPhone, setComplainantPhone] = useState("");
  const [firType, setFirType] = useState("");
  const [actSection, setActSection] = useState("");
  const [victims, setVictims] = useState([{ victimNumber: 1, victimName: '', victimAge: '', victimGender: '', victimSocialCategory: '', victimJob: '' }]);
  const [accused, setAccused] = useState([{ accusedNumber: 1, accusedName: '', accusedGender: '', accusedAge: '', accusedSocialCategory: '', accusedJob: '' }]);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [crimeCategories, setCrimeCategories] = useState([]);
  const categories = ['ARSON', 'ASSAULT', 'BATTERY', 'BURGLARY', 'CONCEALED CARRY LICENSE VIOLATION', 'CRIM SEXUAL ASSAULT', 'CRIMINAL DAMAGE', 'CRIMINAL TRESPASS', 'DECEPTIVE PRACTICE', 'DOMESTIC VIOLENCE', 'GAMBLING', 'HOMICIDE', 'HUMAN TRAFFICKING', 'INTERFERENCE WITH PUBLIC OFFICER', 'INTIMIDATION', 'KIDNAPPING', 'LIQUOR LAW VIOLATION', 'MOTOR VEHICLE THEFT', 'NARCOTICS', 'NON-CRIMINAL', 'NON-CRIMINAL (SUBJECT SPECIFIED)', 'OBSCENITY', 'OFFENSE INVOLVING CHILDREN', 'OTHER NARCOTIC VIOLATION', 'OTHER OFFENSE', 'PROSTITUTION', 'PUBLIC INDECENCY', 'PUBLIC PEACE VIOLATION', 'RITUALISM', 'ROBBERY', 'SEX OFFENSE', 'STALKING', 'THEFT', 'WEAPONS VIOLATION'];

  const handleOfficerIdChange = (event) => {
    setOfficerID(event.target.value);
    getOfficer(event.target.value, setPoliceOfficerName, setOfficerDesig);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleVictimChange = (index, key, value) => {
    let updatedVictims = [...victims];
    updatedVictims[index][key] = value;
    setVictims(updatedVictims);
  };

  const handleAccusedChange = (index, key, value) => {
    let updatedAccused = [...accused];
    updatedAccused[index][key] = value;
    setAccused(updatedAccused);
  };

  const handleAddVictim = () => {
    let newVictim = {
      victimNumber: victims.length + 1,
      victimName: '',
      victimAge: '',
      victimGender: '',
      victimSocialCategory: '',
      victimJob: '',
    };
    setVictims([...victims, newVictim]);
  };

  const handleAddAccused = () => {
    let newAccused = {
      accusedNumber: accused.length + 1,
      accusedName: '',
      accusedGender: '',
      accusedAge: '',
      accusedSocialCategory: '',
      accusedJob: '',
    };
    setAccused([...accused, newAccused]);
  };

  const handleDeleteVictim = (index) => {
    let updatedVictims = victims.filter((victim, i) => i !== index);
    setVictims(updatedVictims);
  };

  const handleDeleteAccused = (index) => {
    let updatedAccused = accused.filter((acc, i) => i !== index);
    setAccused(updatedAccused);
  };

  const [selectedIPCSections, setSelectedIPCSections] = useState([]);

  const [AIIPCSections, setAIIPCSections] = useState([]);

  const [actSectionProgress, setActSectionProgress] = useState(false);

  const [showAIActSection, setShowAIActSection] = useState(false);
  const handleGenerateActSuggestion = () => {
    if (description.length != 0) {
      getActSection(setAIIPCSections, setActSectionProgress, description);
      setShowAIActSection(true);
    }
  };

  const handleIPCSectionChange = (section) => (event) => {
    setSelectedIPCSections(selectedIPCSections.filter((item) => item !== section));
    setActSection((prevActSection) => {
      return prevActSection ? `${prevActSection}, ${section}` : section;
    });
  };

  const [AICatagoryLoading, setAICatagoryLoading] = useState(false)

  const handleAISuggestion = () => {
    getAICatagory(setCrimeCategories, setAICatagoryLoading, crimeCategories, description);
  };

  const addFirDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = () => {

    let accusedList = []
    let victimList = []

    accusedList = accused.map(element => {
      return ({
        "accused_number": element.accusedNumber,
        "accused_name": element.accusedName,
        "accused_gender": element.accusedGender,
        "accused_age": element.accusedAge,
        "accused_social_catagory": element.accusedSocialCategory,
        "accused_job": element.accusedJob
      })
    })

    victimList = victims.map(element => {
      return ({
        "victim_number": element.victimNumber,
        "victim_name": element.victimName,
        "victim_gender": element.victimGender,
        "victim_age": element.victimAge,
        "victim_social_catagory": element.victimSocialCategory,
        "victim_job": element.victimJob
      })
    })

    let data = {
      "io_id": officerID,
      "ps_id": localStorage.getItem('PsId'),
      "complainant_name": complainantName,
      "io_name": policeOfficerName,
      "io_designation": officerDesig,
      "ps_name": localStorage.getItem("psName"),
      "occurrence_date_time_from": dateTimeFrom,
      "occurrence_date_time_to": dateTimeTo,
      "place_of_incident": place,
      "complainant_phone_number": complainantPhone,
      "accused_list": accusedList,
      "victim_list": victimList,
      "description": description,
      "act_section": actSection,
      "crime_catagory_list": crimeCategories,
      "fir_type": firType
    }

    addFirFunc(data, setDialogOpen, setBackdropOpen)
    setBackdropOpen(true)
  };

  const handleCrimeCategoryChange = (event, value) => {
    setCrimeCategories(value);
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

      <DialogComponent backdropOpen={backdropOpen} addFirDialogClose={addFirDialogClose} dialogOpen={dialogOpen} />

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

          <Typography sx={{ mt: '15px' }} variant="h6" gutterBottom>
            Description
          </Typography>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={5}
              value={description}
              onChange={handleDescriptionChange}
              InputProps={{
                startAdornment: <AssignmentIcon />,
              }}
            />
          </Grid>

          <CrimeCatagory AICatagoryLoading={AICatagoryLoading} categories={categories} crimeCategories={crimeCategories} handleAISuggestion={handleAISuggestion} handleCrimeCategoryChange={handleCrimeCategoryChange} />

          <Typography sx={{ mt: '15px' }} variant="h6" gutterBottom>
            Act Section
          </Typography>

          <ActSection setActSection={setActSection} AIIPCSections={AIIPCSections} actSection={actSection} actSectionProgress={actSectionProgress} handleGenerateActSuggestion={handleGenerateActSuggestion} handleIPCSectionChange={handleIPCSectionChange} showAIActSection={showAIActSection} />

          <Typography variant="h5" gutterBottom sx={{ marginBottom: "20px", marginTop: "20px" }}>
            Investigating Officer Details
          </Typography>

          <IODetails setOfficerDesig={setOfficerDesig} setPoliceOfficerName={setPoliceOfficerName} handleOfficerIdChange={handleOfficerIdChange} officerDesig={officerDesig} officerID={officerID} policeOfficerName={policeOfficerName} />

          <Typography variant="h5" gutterBottom>
            FIR Details
          </Typography>
          <Typography variant="h6" gutterBottom>
            Occurrence Of Offence:
          </Typography>

          <OccuranceOfOffence setComplainantName={setComplainantName} setComplainantPhone={setComplainantPhone} setDateTimeFrom={setDateTimeFrom} setDateTimeTo={setDateTimeTo} setFirType={setFirType} setPlace={setPlace} complainantName={complainantName} complainantPhone={complainantPhone} dateTimeFrom={dateTimeFrom} dateTimeTo={dateTimeTo} firType={firType} place={place} />

          <Typography sx={{ mt: '15px' }} variant="h6" gutterBottom>
            Accused Details
          </Typography>

          <AccusedDetails accused={accused} handleAccusedChange={handleAccusedChange} handleAddAccused={handleAddAccused} handleDeleteAccused={handleDeleteAccused} />

          <Typography sx={{ mt: '15px' }} variant="h6" gutterBottom>
            Victim Details
          </Typography>

          <VictimdDetails handleAddVictim={handleAddVictim} handleVictimChange={handleVictimChange} victims={victims} handleDeleteVictim={handleDeleteVictim} />
          <div style={{height: "60px", display: "flex", justifyContent:"center",}}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              endIcon={<SendIcon />}
              sx={{ width: "auto", marginTop: "20px" }}
            >
              Submit
            </Button>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default FileFIRMain;