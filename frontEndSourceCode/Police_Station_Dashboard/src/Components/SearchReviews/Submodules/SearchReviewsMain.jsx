import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TablePagination,
} from '@mui/material';
import styled from '@emotion/styled';
import axios from 'axios';
import { baseUrls, elasticSearchPassword, elasticSearchUserName } from '../../../GlobalConfig/config';

const Heading = styled('div')`
  text-align: center;
  font-weight: normal;
  margin: 20px 0;
`;

const SearchReviewsMain = () => {

  const [showResults, setShowResults] = useState(false);
  const [displayedResults, setDisplayedResults] = useState([]);

  const handleSubmit = (event, pg, rowPg) => {

    event.preventDefault();

    const queryOptions = []

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
      getVisitingTimesAndVisitors(queryOptions, pg, rowPg);

  };


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageCount, setPageCount] = React.useState();
  const [paginationOpen, setPaginationOpen] = React.useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    handleSubmit(event, newPage, rowsPerPage)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    handleSubmit(event, 0, event.target.value);
  };


  async function getVisitingTimesAndVisitors(queries, pageNo, rows) {
    try {
      // setLoading(true);
      queries.push({
        match: {
          police_station_id: localStorage.getItem("PsId")
        }
      })

      queries.push({
        match: {
          is_review_done: true
        }
      })

      console.log(queries)

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


      // setLoading(false);

      console.log('Visit time:', visitingTimesResponse);
      console.log('Visitors:', visitingTimesResponse.data.hits.hits);

      setPageCount(visitingTimesResponse.data.hits.total.value)

      const arr = []

      visitingTimesResponse.data.hits.hits.forEach(element => {
        arr.push(element._source.id)
      });


      console.log(arr)

      if (arr.length == 0) {
        setDisplayedResults([])
      }

      // setPage(0)

      // setDisplayedResults(tableData);
      // setShowResults(true);

      getFeedbacks(arr, visitingTimesResponse.data.hits.hits)

    } catch (error) {
      console.error('Error:', error);
    }
  }

  function convertToReadableFormat(dateTimeString) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    };

    const date = new Date(dateTimeString);
    const readableFormat = new Intl.DateTimeFormat('en-US', options).format(date);

    return readableFormat;
  }



  function modifydDateTime(originalDateTimeString) {
    // Parse the input date string
    let originalDate = new Date(originalDateTimeString);

    // Add 5 hours and 30 minutes to the date
    originalDate.setHours(originalDate.getHours() + 5);
    originalDate.setMinutes(originalDate.getMinutes() + 30);

    // Format the modified date to match the input format
    let modifiedDateTimeString = originalDate.toISOString();

    return convertToReadableFormat(modifiedDateTimeString);
  }


  const generatedRating = (sentiment) => {
    if (sentiment === 'admiration' || sentiment === 'approval' || sentiment === 'optimism' || sentiment === 'amusement' || sentiment === 'pride' || sentiment === 'gratitude' || sentiment === 'love' || sentiment === 'joy') return 5;
    if (sentiment === 'surprise' || sentiment === 'excitement' || sentiment === 'relief' || sentiment === 'caring' || sentiment === 'desire') return 4;
    if (sentiment === 'neutral' || sentiment === 'realization' || sentiment === 'curiosity' || sentiment === 'confusion') return 3;
    if (sentiment === 'disappointment' || sentiment === 'embarrassment' || sentiment === 'disapproval' || sentiment === 'nervousness' || sentiment === 'sadness' || sentiment === 'remorse' || sentiment === 'grief') return 2;
    if (sentiment === 'anger' || sentiment === 'annoyance' || sentiment === 'disgust' || sentiment === 'fear') return 1;
  }

  async function getFeedbacks(ids, visitTimeArray) {
    try {
      // setLoading(true);
      const feedbacks = await axios({
        method: 'post',  // Use 'post' method for sending data in the request body
        url: `${baseUrls.elasticSearchUrl}/reviews/_search`,
        headers: {
          Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
          'Content-Type': 'application/json',
      },
        data: {
          "query": {
            "terms": {
              "visiting_time_id": ids
            }
          },
          "sort": [
            {
              "review_timestamp": {
                "order": "desc"
              }
            }
          ]
        }


      });


      // setLoading(false);

      console.log('Visit time:', feedbacks.data.hits.hits[0]._source);

      const results = [];

      for (let i = 0; i < feedbacks.data.hits.hits.length; i++) {
        for (let j = 0; j < visitTimeArray.length; j++) {
          if (feedbacks.data.hits.hits[i]._source.visiting_time_id == visitTimeArray[j]._source.id) {
            results.push(
              {
                visitorId: visitTimeArray[j]._source.visitor_id,
                visitorName: visitTimeArray[j]._source.visitor_name,
                policeStationId: visitTimeArray[j]._source.police_station_id,
                visitDateTime: modifydDateTime(visitTimeArray[j]._source.visit_date_time),
                reviewDateTime: modifydDateTime(feedbacks.data.hits.hits[i]._source.review_timestamp),
                review: feedbacks.data.hits.hits[i]._source.review,
                positive: feedbacks.data.hits.hits[i]._source.is_positive,
                sentiment: feedbacks.data.hits.hits[i]._source.sentiment,
                // rating: feedbacks.data.hits.hits[i]._source.rating,
                rating: generatedRating(feedbacks.data.hits.hits[i]._source.sentiment),
              }
            )
          }
        }
      }

      console.log(results)

      setDisplayedResults(results)
      setShowResults(true)

      setPaginationOpen(true)

    } catch (error) {
      console.error('Error:', error);
    }
  }

  const [searchFieldValue, setSearchFieldValue] = useState({
    visitor_name: '',
    visitor_email: '',
    visitor_phone: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFieldValue({
      ...searchFieldValue,
      [name]: value,
    });
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <div style={{ height: 'calc(100vh - 4.3rem)', width: '100%', overflowY: 'scroll', overflowX: 'hidden' }}>
          <Heading>
            <Typography variant="h4">Feedback Details</Typography>
          </Heading>

          <Container>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography variant='h7' sx={{ fontFamily: 'sans-serif' }} gutterBottom>Filter by Visitor Name</Typography>
                <TextField sx={{ marginTop: '10px' }} label="Visitor Name" name='visitor_name' onChange={(e) => handleInputChange(e)} fullWidth />
              </Grid>

              {/* <Grid item xs={4}>
                <Typography variant='h7' sx={{ fontFamily: 'sans-serif' }} gutterBottom>Filter by Visitor Email</Typography>
                <TextField sx={{ marginTop: '10px' }} label="Visitor Name" name='visitor_email' onChange={(e) => handleInputChange(e)} fullWidth />
              </Grid> */}

              <Grid item xs={4}>
                <Typography variant='h7' sx={{ fontFamily: 'sans-serif' }} gutterBottom>Filter by Visitor Phone Number</Typography>
                <TextField sx={{ marginTop: '10px' }} label="Visitor Phone Number" name='visitor_phone' onChange={(e) => handleInputChange(e)} fullWidth />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={(e) => handleSubmit(e, page, rowsPerPage)}>
                  Submit
                </Button>
              </Grid>
            </Grid>

            {showResults && (
              <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Visitor ID</TableCell>
                      <TableCell>Visitor Name</TableCell>
                      <TableCell>Police Station ID</TableCell>
                      <TableCell>Visit Time</TableCell>
                      <TableCell>Review Time</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Review</TableCell>
                      <TableCell>Positive</TableCell>
                      <TableCell>Sentiment</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedResults.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>{data.visitorId}</TableCell>
                        <TableCell>{data.visitorName}</TableCell>
                        <TableCell>{data.policeStationId}</TableCell>
                        <TableCell>{data.visitDateTime}</TableCell>
                        <TableCell>{data.reviewDateTime}</TableCell>
                        <TableCell>{data.rating}</TableCell>
                        <TableCell>{data.review}</TableCell>
                        <TableCell>{data.positive ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{data.sentiment}</TableCell>
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
        </div>
      </Grid>
    </Grid>
  );
};

export default SearchReviewsMain;
