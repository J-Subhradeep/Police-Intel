import React, { useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Box,
} from '@mui/material';
import styled from '@emotion/styled';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios';
import { baseUrls, elasticSearchPassword, elasticSearchUserName } from '../../../GlobalConfig/config';

const Heading = styled('div')`
  text-align: center;
  font-weight: normal;
  margin: 20px 0;
`;

const SearchVisitorsMain = () => {

  const [showResults, setShowResults] = useState(false);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [loading, setLoading] = useState(false)

  const handleSubmit = (pageNo, rows) => {

    const queryOptions = []

    queryOptions.push({
      match: {
        police_station_id: localStorage.getItem("PsId")
      }
    })

    if (searchFieldValue.visitor_address.length > 0) {
      queryOptions.push({
        match: {
          visitor_address: searchFieldValue.visitor_address
        }
      })
    }
    if (searchFieldValue.visitor_email.length > 0) {
      queryOptions.push({
        match: {
          visitor_email: searchFieldValue.visitor_email
        }
      })
    }
    if (searchFieldValue.visitor_name.length > 0) {
      queryOptions.push({
        match: {
          visitor_name: searchFieldValue.visitor_name
        }
      })
    }
    if (searchFieldValue.visitor_phone.length > 0) {
      queryOptions.push({
        match: {
          visitor_phone: searchFieldValue.visitor_phone
        }
      })
    }
    console.log(queryOptions)
    // getResult(queryOptions);
    getVisitingTimesAndVisitors(queryOptions, pageNo, rows);

    // setShowResults(true);

    console.log(tableData)

    setPaginationOpen(true)
  };

  const [searchFieldValue, setSearchFieldValue] = useState({
    visitor_address: '',
    visitor_name: '',
    visitor_email: '',
    visitor_phone: ''
  })

  const getDefaultStartDate = () => {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Add 5 hours and 30 minutes to the date
    oneWeekAgo.setHours(oneWeekAgo.getHours() + 5);
    oneWeekAgo.setMinutes(oneWeekAgo.getMinutes() + 30);

    const formattedStartDate = oneWeekAgo.toISOString().slice(0, 16);

    return formattedStartDate;
  };


  const getCurrentDateTime = () => {
    // Get the current date and time
    const currentDate = new Date();

    // Add 5 hours and 30 minutes to the current date and time
    currentDate.setHours(currentDate.getHours() + 5);
    currentDate.setMinutes(currentDate.getMinutes() + 30);

    // Format the date and time as a string
    const formattedCurrentDateTime = currentDate.toISOString().slice(0, 16);

    console.log(formattedCurrentDateTime);
    return formattedCurrentDateTime;
  };

  // Call the function to get the modified date and time
  getCurrentDateTime();


  const dateTimeConversion = (inputDatetimeStr) => {

    const inputDatetime = new Date(inputDatetimeStr);

    // Get UTC components
    const year = inputDatetime.getUTCFullYear();
    const month = inputDatetime.getUTCMonth() + 1; // Month is zero-based
    const day = inputDatetime.getUTCDate();
    const hours = inputDatetime.getUTCHours();
    const minutes = inputDatetime.getUTCMinutes();
    const seconds = inputDatetime.getUTCSeconds();

    // Format the UTC datetime string
    const outputDatetimeStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}Z`;
    // console.log(outputDatetimeStr)
    return outputDatetimeStr
  }

  const [dateTime, setDateTime] = useState({
    gte: getDefaultStartDate(),
    lte: getCurrentDateTime(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchFieldValue({
      ...searchFieldValue,
      [name]: value,
    });

  }

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateTime({
      ...dateTime,
      [name]: value
    })
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageCount, setPageCount] = React.useState();
  const [paginationOpen, setPaginationOpen] = React.useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    handleSubmit(newPage, rowsPerPage)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    handleSubmit(0, event.target.value);
  };

  function maskEmail(email) {
    // Split the email address into two parts: username and domain
    var parts = email.split('@');

    // Get the username and domain parts
    var username = parts[0];
    var domain = parts[1];

    // Get the first and last letters of the username
    var firstLetter = username.charAt(0);
    var lastLetter = username.charAt(username.length - 1);

    // Calculate the number of masked letters
    var numMaskedLetters = Math.max(0, username.length - 2);

    // Create the masked username using asterisks
    var maskedUsername = firstLetter + '*'.repeat(numMaskedLetters) + lastLetter;

    // Combine the masked username with the domain to form the masked email
    var maskedEmail = maskedUsername + '@' + domain;

    return maskedEmail;
  }

  function maskPhoneNumber(phoneNumber) {
    // Check if the phone number starts with '+91'
    if (phoneNumber.startsWith('+91')) {
      // Extract the last 4 digits
      const lastFourDigits = phoneNumber.slice(-4);

      // Create the masked string
      const maskedNumber = '+91' + '*'.repeat(phoneNumber.length - 6) + lastFourDigits;

      return maskedNumber;
    } else {
      // If the number doesn't start with '+91', just mask all digits except the last 4
      const lastFourDigits = phoneNumber.slice(-4);
      const maskedNumber = '*'.repeat(phoneNumber.length - 4) + lastFourDigits;

      return maskedNumber;
    }
  }

  const tableData = [];

  async function getVisitingTimesAndVisitors(queries, pageNo, rows) {

    queries.push({
      "range": {
        "visit_date_time": {
          "gte": dateTimeConversion(dateTime.gte),
          "lte": dateTimeConversion(dateTime.lte)
        }
      }
    })

    console.log('gte:', dateTime.gte)
    console.log('gte:', dateTime.lte)

    try {
      setLoading(true);
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
              "must": queries
            }
          },
          "sort": [
            {
              "visit_date_time": {
                "order": "desc"
              }
            }
          ],
          "from": (pageNo * rows),
          "size": rows
        }

      });


      setLoading(false);

      console.log('Visit time:', visitingTimesResponse);

      setPageCount(visitingTimesResponse.data.hits.total.value)

      // console.log('Visitors:', visitorsResponse.data.hits.hits);

      visitingTimesResponse.data.hits.hits.forEach(element => {
        const dateTime = new Date(element._source.visit_date_time);
        const readableDateTime = dateTime.toLocaleString();
        tableData.push({
          name: element._source.visitor_name,
          timeOfVisit: readableDateTime,
          email: maskEmail(element._source.visitor_email),
          phone: maskPhoneNumber(element._source.visitor_phone),
          address: element._source.visitor_address,
        })
      });

      console.log(tableData)

      setDisplayedResults(tableData);
      setShowResults(true);

    } catch (error) {
      console.error('Error:', error);
    }
  }



  return (
    <Box sx={{ height: 'calc(100vh - 4.3rem)', overflowX: 'hidden', overflowY: 'scroll' }}>
      <Heading>
        <Typography variant="h4">
          Visitors Details
        </Typography>
      </Heading>

      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography sx={{ fontStyle: 'sans-serif', mb: '10px' }} >
              Select Date and Time Interval
            </Typography>
            {(
              <Grid container spacing={2}>
                <Grid item xs={2.5}>
                  <TextField
                    label="Start Date-Time"
                    type="datetime-local"
                    fullWidth
                    value={dateTime.gte}
                    name='gte'
                    onChange={(e) => handleDateChange(e)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2.5}>
                  <TextField
                    label="End Date-Time"
                    type="datetime-local"
                    value={dateTime.lte}
                    name='lte'
                    onChange={(e) => handleDateChange(e)}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>


          <Grid item xs={4}>
            <Typography sx={{ fontStyle: 'sans-serif', mb: '10px' }} >
              Filter Visitors by Name
            </Typography>
            {(
              <TextField name='visitor_name' onChange={(e) => handleChange(e)} label="Visitor Name" fullWidth />
            )}
          </Grid>

          <Grid item xs={4}>
            <Typography sx={{ fontStyle: 'sans-serif', mb: '10px' }} >
              Filter Visitors by Email
            </Typography>
            {(
              <TextField name='visitor_email' onChange={(e) => handleChange(e)} label="Visitor Email" fullWidth />
            )}
          </Grid>

          <Grid item xs={4}>
            <Typography sx={{ fontStyle: 'sans-serif', mb: '10px' }} >
              Filter Visitors by Phone Number
            </Typography>
            {(
              <TextField name='visitor_phone' onChange={(e) => handleChange(e)} label="Visitor Phone Number" fullWidth />
            )}
          </Grid>
          <Grid item xs={4}>
            <Typography sx={{ fontStyle: 'sans-serif', mb: '10px' }} >
              Filter Visitors by Address
            </Typography>
            {(
              <TextField name='visitor_address' onChange={(e) => handleChange(e)} label="Visitor Address" fullWidth />
            )}
          </Grid>

          {/* Add similar structure for other filter options */}

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit(page, rowsPerPage)}
              disabled={loading}
              sx={{ marginTop: '16px' }}
            >
              {loading ? 'Loading...' : 'Filter'}
            </Button>
          </Grid>
        </Grid>

        {showResults && (
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Time of Visit</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedResults.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.timeOfVisit}</TableCell>
                    {data.email === "@undefined" ? <TableCell></TableCell> : <TableCell>{data.email}</TableCell>}
                    <TableCell>{data.phone}</TableCell>
                    <TableCell>{data.address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
          {paginationOpen ?
            <TablePagination
              component="div"
              count={pageCount}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            :
            <></>
          }
        </Box>
      </Container>
    </Box>
  );
};

export default SearchVisitorsMain;
