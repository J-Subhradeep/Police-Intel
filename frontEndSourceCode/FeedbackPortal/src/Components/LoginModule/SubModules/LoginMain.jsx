import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Box, Grid, Radio, RadioGroup, FormControlLabel, Divider } from '@mui/material';
import axios from 'axios';
import Feedback from '../../FeedbackModule/Feedback';
import Grivence from '../../Grievence/Grievence'; import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToggleButton, ToggleButtonGroup, FormControl } from '@mui/material';
import { styled } from '@mui/system';
import { baseUrls, color, elasticSearchPassword, elasticSearchUserName } from '../../../GlobalConfig/config';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  '& .MuiToggleButton-root': {
    color: '#333', // text color
    borderRadius: 10,
    '&.Mui-selected': {
      backgroundColor: color.color1, // selected color
      color: '#fff', // selected text color
      '&:hover': {
        backgroundColor: color.color2, // darker shade on hover
      },
    },
    '&:hover': {
      backgroundColor: '#ddd', // darker shade on hover
    },
  },
});

const LoginMain = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption == 'review') {
      getVisitirData()
    } else {
      setIsGrivenceActive(true);
      setIsLoginActive(false);
      setIsFeedbackActive(false);
    }

  };

  const [isLoginActive, setIsLoginActive] = useState(true);
  const [isFeedbackActive, setIsFeedbackActive] = useState(false);
  const [isGrivenceActive, setIsGrivenceActive] = useState(false);
  const [visitorAndPsArray, setVisitorAndPsArray] = useState([]);
  const [error, setError] = useState({
    isError: false,
    errorTitle: '',
    errorMessage: ''
  })

  async function getVisitirData() {

    try {
      // setLoading(true);
      const visitingTimesResponse = await axios({
        method: 'post',  // Use 'post' method for sending data in the request body
        url: `${baseUrls.elasticSearchUrl}/visiting_times/_search`,
        headers: {
          Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
          'Content-Type': 'application/json',
        },
        data: {
          "query": {
            "bool": {
              "must": [
                {
                  "match": {
                    "visitor_phone": phoneNumber
                  }
                },
                {
                  "match": {
                    "is_review_done": false
                  }
                }
              ]
            }
          },
          "sort": [
            {
              "visit_date_time": {
                "order": "desc"
              }
            }
          ]
        }
      });

      console.log('Visitor data', visitingTimesResponse.data.hits.hits);

      let policeStationArray = []

      if (visitingTimesResponse.data.hits.hits.length > 0) {
        localStorage.setItem("visitorId", visitingTimesResponse.data.hits.hits[0]._source.visitor_id)
        // localStorage.setItem("policeStationId", visitingTimesResponse.data.hits.hits[0]._source.police_station_id)
        // localStorage.setItem("visitingTimeId", visitingTimesResponse.data.hits.hits[0]._source.id)

        visitingTimesResponse.data.hits.hits.forEach(element => {
          policeStationArray.push(element._source.police_station_id)

        });

        console.log(policeStationArray);
        getPsData(policeStationArray, visitingTimesResponse.data.hits.hits)
      }
      else {
        handleError(true, "No record found for this phone number.", "Lodge a grivence/suggestion instead.")
        setDialogOpen(true)
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function getPsData(psIdArray, visitingTimeResponse) {

    try {
      // setLoading(true);
      const psData = await axios({
        method: 'post',  // Use 'post' method for sending data in the request body
        url: `${baseUrls.elasticSearchUrl}/police_stations/_search`,
        headers: {
          Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
          'Content-Type': 'application/json',
        },
        data: {
          "query": {
            "bool": {
              "must": [
                { "terms": { "id": psIdArray } }
              ]
            }
          }
        }
      });


      // setLoading(false);

      console.log('Ps data', psData.data.hits.hits);

      const finalArray = [];

      for (let i = 0; i < visitingTimeResponse.length; i++) {
        for (let j = 0; j < psData.data.hits.hits.length; j++) {
          console.log(visitingTimeResponse[i])
          if (visitingTimeResponse[i]._source.police_station_id == psData.data.hits.hits[j]._source.id) {

            const isoDateTimeString = visitingTimeResponse[i]._source.visit_date_time;

            const dateTime = new Date(isoDateTimeString);

            // Set the time zone to 'Asia/Kolkata' (Indian Standard Time)
            const options = {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              timeZone: 'Asia/Kolkata'
            };

            const readableDateTime = new Intl.DateTimeFormat('en-US', options).format(dateTime);

            finalArray.push({
              psId: psData.data.hits.hits[j]._source.id,
              visitingTimeId: visitingTimeResponse[i]._source.id,
              psName: psData.data.hits.hits[j]._source.police_station_name,
              address: psData.data.hits.hits[j]._source.address,
              visitTime: readableDateTime
            })
          }
        }
      }

      console.log('finalArray', finalArray)

      setVisitorAndPsArray(finalArray);

      setIsLoginActive(false);
      setIsFeedbackActive(true);

    } catch (error) {
      console.error('Error:', error);
    }
  }
  const paperStyle = {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  function handleError(isError, errorTitle, errorMessage) {
    setError({
      isError: isError,
      errorTitle: errorTitle,
      errorMessage: errorMessage
    })
  }

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    window.location.reload();
  };

  const handleChange = (event, newValue) => {
    setSelectedOption(newValue);
  };


  return (
    <Box>
      {isLoginActive &&
        (<Box sx={{ height: 'calc(100vh - 9rem)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '3rem', overflowX: 'hidden', overflowY: 'scroll' }}>
          <Container component="main" maxWidth="xs">

            <div style={{ marginBottom: '20px' }}>
              <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Heading above the radio buttons */}
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Select an Option
                </Typography>

              </Container>

              <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Radio buttons for selecting options */}
                <FormControl component="fieldset">
                  <StyledToggleButtonGroup
                    value={selectedOption}
                    exclusive
                    onChange={handleChange}
                    aria-label="text alignment"
                  >
                    <ToggleButton value="review" aria-label="review">
                      Give Feedback
                    </ToggleButton>
                    <ToggleButton value="grievance" aria-label="grievance">
                      Lodge Grievance
                    </ToggleButton>
                  </StyledToggleButtonGroup>
                </FormControl>
              </Container>
            </div>

            {/* Paper containing the "Enter Your Phone Number" section */}
            {selectedOption && (
              <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                  variant={{ xs: 'h6', md: 'h5' }}
                  gutterBottom
                  sx={{
                    fontFamily: 'sans-serif',
                    fontWeight: { xs: 300, md: 600 },
                    fontSize: { xs: '1.1rem', md: '1.4rem' },
                  }}
                >
                  Verify Your Phone Number
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 20 }}>
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <Button variant="outlined" color="primary" style={{ marginTop: 10 }}>
                    Get OTP
                  </Button>
                  <TextField
                    label="OTP"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  // value={phoneNumber}
                  // onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <Button type="submit" variant="contained" sx={{
                    bgcolor: color.color1,
                    '&:hover': {
                        bgcolor: color.color2, // Change to the desired hover color
                    },}} style={{ marginTop: 10 }}>
                    Enter
                  </Button>
                </form>
              </Paper>
            )}
          </Container>
        </Box>)}
      {error.isError && (<Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {error.errorTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error.errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
      )}
      {isFeedbackActive && (
        <Feedback visitorAndPsArray={visitorAndPsArray} handleDialogOpen={handleDialogOpen} handleError={handleError} />
      )}
      {isGrivenceActive && (
        <Grivence props={phoneNumber} />
      )}
    </Box>
  );
};

export default LoginMain;