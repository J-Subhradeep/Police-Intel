
import React, { useState } from 'react';
import {
  Typography,
  Container,
  Grid,

  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,

  TablePagination,
  IconButton,
} from '@mui/material';
import styled from '@emotion/styled';
import axios from 'axios';
import { baseUrls, elasticSearchPassword, elasticSearchUserName } from '../../../../GlobalConfig/config';
import DialogBoxVisitorDetails from './DialogBoxVisitorDetails';
import { openDialouge } from '../Utility/utility';
import { useEffect } from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const Heading = styled('div')`
  text-align: center;
  font-weight: normal;
  margin: 20px 0;
`;

const SearchReviewsMain = () => {

  const [showResults, setShowResults] = useState(false);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [dialouge, setDialouge] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorAddress, setVisitorAddress] = useState('');
  const [visitingTime, setVisitingTime] = useState('');


  const handleSubmit = (pg, rowPg) => {
    getFeedbacks(pg, rowPg)
  };

  useEffect(() => {
    handleSubmit(page, rowsPerPage)
  }, [])



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



  async function getFeedbacks(pageNo, rows) {
    try {
      const feedbacks = await axios({
        method: 'post',  // Use 'post' method for sending data in the request body
        url: `${baseUrls.elasticSearchUrl}/reviews/_search`,
        headers: {
          Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
          'Content-Type': 'application/json',
        },
        data: {
          "query": {
            "match": {
              "police_station_id": localStorage.getItem("PsId")
            }
          },
          "sort": [
            {
              "review_timestamp": {
                "order": "desc"
              }
            }
          ],
          "from": (pageNo * rows),
          "size": rows
        }


      });
      const data = feedbacks.data.hits.hits
      let results = [];


      data.map((feedback) => {
        const reviewDateTime = new Date(feedback._source.review_timestamp)
        const formattedReviewDateTime = reviewDateTime.toLocaleString();
        results.push({
          visitorId: feedback._source.id,
          visiting_time_id: feedback._source.visiting_time_id,
          policeStationId: feedback._source.police_station_id,
          reviewDateTime: formattedReviewDateTime,
          review: feedback._source.review,
          positive: feedback._source.is_positive,
          sentiment: feedback._source.sentiment,
          rating: feedback._source.rating,
        })
      })
      //  console.log(results)
      setPageCount(feedbacks.data.hits.total.value)
      setDisplayedResults(results)
      setShowResults(true)
      setPaginationOpen(true)
    } catch (error) {
      console.error('Error:', error);
    }
  }




  const handleCloseDialouge = () => {
    setDialouge(false);
  }
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <div style={{ height: 'calc(100vh - 4.3rem)', width: '100%', overflowY: 'scroll', overflowX: 'hidden' }}>
          <Heading>
            <Typography variant="h4">Feedback Details</Typography>
          </Heading>

          <Container>
            {showResults && (
              <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Visitor ID</TableCell>
                      <TableCell>Police Station ID</TableCell>
                      <TableCell>Review Time</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Review</TableCell>
                      <TableCell>Positive</TableCell>
                      <TableCell>Sentiment</TableCell>
                      <TableCell>Visitor Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayedResults.map((data, index) => (
                      <TableRow key={index} >
                        <TableCell>{data.visitorId}</TableCell>
                        <TableCell>{data.policeStationId}</TableCell>
                        <TableCell>{data.reviewDateTime}</TableCell>
                        <TableCell>{data.rating}</TableCell>
                        <TableCell>{data.review}</TableCell>
                        <TableCell>{data.positive ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{data.sentiment}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => { openDialouge(data, setDialouge, setVisitorName, setVisitorEmail, setVisitorPhone, setVisitorAddress, setVisitingTime) }}>
                            <ArrowOutwardIcon color='primary' />
                          </IconButton>
                        </TableCell>
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
        {dialouge && (
          <DialogBoxVisitorDetails dialouge={dialouge} handleCloseDialouge={handleCloseDialouge} visitorName={visitorName} visitorEmail={visitorEmail} visitorPhone={visitorPhone} visitingTime={visitingTime} visitorAddress={visitorAddress} />
        )}
      </Grid>
    </Grid >
  );
};

export default SearchReviewsMain;
