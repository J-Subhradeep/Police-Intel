import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  CssBaseline,
  Grid,
  Box,
  Checkbox,
  Autocomplete,
  Chip,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SendIcon from "@mui/icons-material/Send";
import BadgeIcon from "@mui/icons-material/Badge";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import GavelIcon from '@mui/icons-material/Gavel';
import Paper from '@mui/material/Paper';
import { baseUrls, elasticSearchPassword, elasticSearchUserName } from "../../../GlobalConfig/config";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';


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

  // const [crimeCategory, setCrimeCategory] = useState("");
  //CRIMECATAGORY IS NOT BEING USED, SEARCHVALUE IS BEING USED IN PLCAE OF CRIME CATEGORY
  const categories = ['ARSON', 'ASSAULT', 'BATTERY', 'BURGLARY', 'CONCEALED CARRY LICENSE VIOLATION', 'CRIM SEXUAL ASSAULT', 'CRIMINAL DAMAGE', 'CRIMINAL TRESPASS', 'DECEPTIVE PRACTICE', 'DOMESTIC VIOLENCE', 'GAMBLING', 'HOMICIDE', 'HUMAN TRAFFICKING', 'INTERFERENCE WITH PUBLIC OFFICER', 'INTIMIDATION', 'KIDNAPPING', 'LIQUOR LAW VIOLATION', 'MOTOR VEHICLE THEFT', 'NARCOTICS', 'NON-CRIMINAL', 'NON-CRIMINAL (SUBJECT SPECIFIED)', 'OBSCENITY', 'OFFENSE INVOLVING CHILDREN', 'OTHER NARCOTIC VIOLATION', 'OTHER OFFENSE', 'PROSTITUTION', 'PUBLIC INDECENCY', 'PUBLIC PEACE VIOLATION', 'RITUALISM', 'ROBBERY', 'SEX OFFENSE', 'STALKING', 'THEFT', 'WEAPONS VIOLATION'];

  const [searchValue, setSearchValue] = useState('');

  const GradientButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 33,
    padding: '0 8px',
    marginTop: '5px',
    '&:hover': {
      background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    },
  }));

  const GradientButton2 = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 33,
    padding: '0 8px',
    marginTop: '5px',
    '&:hover': {
      background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    },
    position: 'absolute', bottom: 1, right: 1, margin: '5px'
  }));


  const handlePoliceOfficerNameChange = (event) => {
    setPoliceOfficerName(event.target.value);
  };

  const handleOfficerDesigChange = (event) => {
    setOfficerDesig(event.target.value);
  };

  const handleOfficerIdChange = (event) => {
    setOfficerID(event.target.value);
    getOfficer(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFromDateTimeChange = (event) => {
    setDateTimeFrom(event.target.value);
  };
  const handleToDateTimeChange = (event) => {
    setDateTimeTo(event.target.value);
  };

  const handlePlaceChange = (event) => {
    setPlace(event.target.value);
  };

  const handleComplainantNameChange = (event) => {
    setComplainantName(event.target.value);
  };

  const handleComplainantPhoneChange = (event) => {
    setComplainantPhone(event.target.value);
  };

  const handleFirTypeChange = (event) => {
    setFirType(event.target.value);
  };

  const handleActSectionChange = (event) => {
    setActSection(event.target.value);
  };

  // const handleCrimeCategoryChange = (event) => {
  //   setCrimeCategory(event.target.value);
  // };

  const handleVictimChange = (index, key, value) => {
    const updatedVictims = [...victims];
    updatedVictims[index][key] = value;
    setVictims(updatedVictims);
  };

  const handleAccusedChange = (index, key, value) => {
    const updatedAccused = [...accused];
    updatedAccused[index][key] = value;
    setAccused(updatedAccused);
  };

  const handleAddVictim = () => {
    const newVictim = {
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
    const newAccused = {
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
    const updatedVictims = victims.filter((victim, i) => i !== index);
    setVictims(updatedVictims);
  };

  const handleDeleteAccused = (index) => {
    const updatedAccused = accused.filter((acc, i) => i !== index);
    setAccused(updatedAccused);
  };

  async function getOfficer(id) {

    // console.log(userId)
    try {
      const userResponse = await axios({
        method: 'post',  // Use 'post' method for sending data in the request body
        url: `${baseUrls.elasticSearchUrl}/officer_repository/_search`,
        headers: {
          Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
          'Content-Type': 'application/json',
      },
        data: {
          "query": {
            "match": {
              "id": id
            }
          }
        }

      });

      console.log(userResponse.data.hits)

      if (userResponse.data.hits.hits.length == 0) {
        setPoliceOfficerName("Invalid ID");
        setOfficerDesig("Invalid ID");
      } else {
        setPoliceOfficerName(userResponse.data.hits.hits[0]._source.name);
        setOfficerDesig(userResponse.data.hits.hits[0]._source.role);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  const [selectedIPCSections, setSelectedIPCSections] = useState([]);

  const dummyIPCSections = ['Section 1', 'Section 2', 'Section 3']; // Dummy IPC sections

  const [AIIPCSections, setAIIPCSections] = useState([]);

  const [actSectionProgress, setActSectionProgress] = useState(false);

  function getActSection() {

    setActSectionProgress(true);

    const text = {
      text: description
    }

    axios
      .post(`${baseUrls.aiToolsUrl}/sections`, text, {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then((res) => {
        console.log(res.data);
        setAIIPCSections(res.data);
        setActSectionProgress(false)
      })
      .catch((err) => {
        console.log(err);
        // setActSectionProgress(false)
      });
  }

  const [showAIActSection, setShowAIActSection] = useState(false);
  const handleGenerateActSuggestion = () => {
    // Logic for generating AI suggestion
    if (description.length != 0) {
      getActSection();
      setShowAIActSection(true);
    }
  };

  const handleIPCSectionChange = (section) => (event) => {

    setSelectedIPCSections(selectedIPCSections.filter((item) => item !== section));

    setActSection((prevActSection) => {
      return prevActSection ? `${prevActSection}, ${section}` : section;
    });
  };

  const handleSearchChange = (event, value) => {
    setSearchValue(value);
  };

  const [AICatagoryLoading, setAICatagoryLoading] = useState(false)
  const [showAICatagory, setShowAICatagory] = useState(false)
  const [predictedCatagiries, setPredictedCatagiries] = useState([])

  function getAICatagory() {

    setAICatagoryLoading(true);

    const text = {
      text: description
    }

    axios
      .post(`${baseUrls.aiToolsUrl}/fir-categories`, text, {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then((res) => {
        console.log(res.data.predicted_class);

        const concatenatedArray = crimeCategories.concat(res.data.predicted_class);
        const uniqueArray = concatenatedArray.filter((item, index) => {
          return concatenatedArray.indexOf(item) === index;
        });

        setCrimeCategories(uniqueArray)
        setAICatagoryLoading(false);
        setShowAICatagory(true);
        setPredictedCatagiries(res.data.predicted_class);
      })
      .catch((err) => {
        console.log(err);
        // setAICatagoryLoading(false);
      });
  }

  const handleAISuggestion = () => {
    getAICatagory();
  };

  const navigate = useNavigate();

  const addFirDialogClose = () => {
    setDialogOpen(false);
    navigate(`/firfrontpage`);
  };

  function addFirFunc(firData) {

    axios
      .post(`${baseUrls.backEndUrl}/police-admin/fir/manage/add-fir`, firData, {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then((res) => {
        console.log(res);
        setBackdropOpen(false);
        setDialogOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setBackdropOpen(false);
      });
  }

  const handleSubmit = () => {

    const accusedList = []
    const victimList = []

    accused.forEach(element => {
      accusedList.push({
        "accused_number": element.accusedNumber,
        "accused_name": element.accusedName,
        "accused_gender": element.accusedGender,
        "accused_age": element.accusedAge,
        "accused_social_catagory": element.accusedSocialCategory,
        "accused_job": element.accusedJob
      })
    })

    victims.forEach(element => {
      victimList.push({
        "victim_number": element.victimNumber,
        "victim_name": element.victimName,
        "victim_gender": element.victimGender,
        "victim_age": element.victimAge,
        "victim_social_catagory": element.victimSocialCategory,
        "victim_job": element.victimJob
      })
    })

    const data = {
      "io_id": officerID,
      "ps_id": localStorage.getItem('PsId'),
      "complainant_name": complainantName,
      "io_name": policeOfficerName,
      "io_designation": officerDesig,
      "ps_name": localStorage.getItem("PsName"),
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

    addFirFunc(data)
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

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={dialogOpen}
        onClose={addFirDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          FIR Saved
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can close the alert
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={addFirDialogClose}>Ok</Button>
        </DialogActions>
      </Dialog>

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
          <Typography variant="h5" gutterBottom sx={{ marginBottom: "20px" }}>
            Investigation Officer Details
          </Typography>
          <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
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
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label=" Name"
                variant="outlined"
                value={policeOfficerName}
                onChange={handlePoliceOfficerNameChange}
                disabled={true}
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
                disabled={true}
                InputProps={{
                  startAdornment: <AssignmentIcon />,
                }}
              />
            </Grid>
          </Grid>
          <Typography variant="h5" gutterBottom>
            FIR Details
          </Typography>
          <Typography variant="h6" gutterBottom>
            Occurrence Of Offence:
          </Typography>

          <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="p" sx={{ fontSize: "12px" }}>From</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="datetime-local"
                value={dateTimeFrom}
                onChange={handleFromDateTimeChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="p" sx={{ fontSize: "12px" }}>To</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="datetime-local"
                value={dateTimeTo}
                onChange={handleToDateTimeChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Place Of Incident"
                variant="outlined"
                value={place}
                onChange={handlePlaceChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Complainant Name"
                variant="outlined"
                value={complainantName}
                onChange={handleComplainantNameChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Complainant Phone Number"
                variant="outlined"
                value={complainantPhone}
                onChange={handleComplainantPhoneChange}
              />
            </Grid>
          </Grid>
          <Typography sx={{ mt: '15px' }} variant="h6" gutterBottom>
            Accused Details
          </Typography>
          {accused.map((acc, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={acc.accusedName}
                  onChange={(e) => handleAccusedChange(index, 'accusedName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Select
                    value={acc.accusedGender}
                    onChange={(e) => handleAccusedChange(index, 'accusedGender', e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="" disabled>
                      Gender
                    </MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Age"
                  variant="outlined"
                  type="number"
                  value={acc.accusedAge}
                  onChange={(e) => handleAccusedChange(index, 'accusedAge', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Select
                    value={acc.accusedSocialCategory}
                    onChange={(e) => handleAccusedChange(index, 'accusedSocialCategory', e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="" disabled>
                      Social Category
                    </MenuItem>
                    <MenuItem value="Upper Class">Upper Class</MenuItem>
                    <MenuItem value="Middle Class">Middle Class</MenuItem>
                    <MenuItem value="Lower Class">Lower Class</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Select
                    value={acc.accusedJob}
                    onChange={(e) => handleAccusedChange(index, 'accusedJob', e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="" disabled>
                      Job
                    </MenuItem>
                    <MenuItem value="Unemployed">Unemployed</MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Retired Person">Retired Person</MenuItem>
                    <MenuItem value="Government Job">Government Job</MenuItem>
                    <MenuItem value="Private Service">Private Service</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  startIcon={<DeleteIcon />}
                  color="error"
                  onClick={() => handleDeleteAccused(index)}
                >
                  Delete Accused
                </Button>
              </Grid>
            </Grid>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddAccused}
          >
            Add Another Accused
          </Button>
          <Typography sx={{ mt: '15px' }} variant="h6" gutterBottom>
            Victim Details
          </Typography>
          {victims.map((vic, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={vic.victimName}
                  onChange={(e) => handleVictimChange(index, 'victimName', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Select
                    value={vic.victimGender}
                    onChange={(e) => handleVictimChange(index, 'victimGender', e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="" disabled>
                      Gender
                    </MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Age"
                  variant="outlined"
                  type="number"
                  value={vic.victimAge}
                  onChange={(e) => handleVictimChange(index, 'victimAge', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Select
                    value={vic.victimSocialCategory}
                    onChange={(e) => handleVictimChange(index, 'victimSocialCategory', e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="" disabled>
                      Social Category
                    </MenuItem>
                    <MenuItem value="Upper Class">Upper Class</MenuItem>
                    <MenuItem value="Middle Class">Middle Class</MenuItem>
                    <MenuItem value="Lower Class">Lower Class</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <Select
                    value={vic.victimJob}
                    onChange={(e) => handleVictimChange(index, 'victimJob', e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="" disabled>
                      Job
                    </MenuItem>
                    <MenuItem value="Unemployed">Unemployed</MenuItem>
                    <MenuItem value="Government Job">Government Job</MenuItem>
                    <MenuItem value="Private Service">Private Service</MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  startIcon={<DeleteIcon />}
                  color="error"
                  onClick={() => handleDeleteVictim(index)}
                >
                  Delete Victim
                </Button>
              </Grid>
            </Grid>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddVictim}
          >
            Add Another Victim
          </Button>
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
          <Grid>
            <Typography sx={{ mt: '15px' }} variant="h6" gutterBottom>
              Crime Category
            </Typography>
            <Autocomplete
              sx={{ width: "70%" }}
              multiple
              id="checkboxes-crime-categories"
              options={categories}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              onChange={handleCrimeCategoryChange}
              value={crimeCategories}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox checked={selected} />
                  {option}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Crime Categories" />
              )}
            />
            {/* Show selected crime categories as chips */}
            <GradientButton variant="contained" size="small" onClick={handleAISuggestion}>
              {AICatagoryLoading ? (
                <>
                  <CircularProgress size={20} color="inherit" /> Loading...
                </>
              ) : (
                <>
                  <AutoAwesomeIcon /> AI Suggestion
                </>
              )}
            </GradientButton>
            {/* <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginBottom: '20px' }}>
              <Typography sx={{ mt: '15px' }} variant="h6" gutterBottom>
                Selected Crime Categories
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {crimeCategories.map((category, index) => (
                  <Chip
                    key={index}
                    label={category}
                    onDelete={() => {
                      setCrimeCategories((prevCategories) =>
                        prevCategories.filter((cat) => cat !== category)
                      );
                    }}
                    sx={{ margin: '5px' }}
                  />
                ))}
              </Box>
            </Paper> */}
          </Grid>
          <Typography sx={{ mt: '15px' }} variant="h6" gutterBottom>
            Act Section
          </Typography>
          <Grid item xs={12}>
            <div style={{ position: 'relative' }}>
              <TextField
                fullWidth
                label="Act Section"
                variant="outlined"
                multiline
                rows={2}
                value={actSection}
                onChange={handleActSectionChange}
                InputProps={{
                  startAdornment: <GavelIcon />,
                }}
              />
              <GradientButton2 variant="contained" size="small" onClick={handleGenerateActSuggestion}>
                {actSectionProgress ? (
                  <>
                    <CircularProgress size={20} color="inherit" /> Loading...
                  </>
                ) : (
                  <>
                    <AutoAwesomeIcon /> AI Suggestion
                  </>
                )}
              </GradientButton2>
            </div>

            <div>
              {showAIActSection && (
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginBottom: '20px' }}>
                  <Typography variant="body1">AI Generated Suggestion</Typography>
                  <Typography variant="body2">Click to add</Typography>
                  {actSectionProgress && <CircularProgress />}
                  {/* <FormControl component="fieldset">
                    {AIIPCSections.map((section) => (
                      <FormControlLabel
                        key={section}
                        control={<Checkbox checked={selectedIPCSections.includes(section)} onChange={handleIPCSectionChange(section)} />}
                        label={section}
                      />
                    ))}
                  </FormControl> */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {AIIPCSections.map((section, index) => (
                      <Chip
                        color="primary"
                        key={section}
                        label={section}
                        sx={{ margin: '5px' }}
                        clickable
                        onClick={handleIPCSectionChange(section)}
                      />
                    ))}
                  </Box>
                </Paper>
              )}
            </div>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            endIcon={<SendIcon />}
            sx={{ width: "auto", marginTop: "20px" }}
          >
            Submit
          </Button>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default FileFIRmain;

