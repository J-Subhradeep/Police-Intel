import React, { useState } from 'react';
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
  Box,
} from '@mui/material';
import styled from '@emotion/styled';
import TablePagination from '@mui/material/TablePagination';
import { getDefaultStartDate, getCurrentDateTime } from '../../Utility/getDefaultDate';
import { visitingTimesResponseData } from '../../Utility/VisitorAPIData';
import SelectPoliceStation from '../../../Common/SelectPoliceStation/SelectPoliceStation';

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
    let queryOptions = []

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
    getVisitingTimesAndVisitors(queryOptions, pageNo, rows)
    setPaginationOpen(true)
  };

  const [searchFieldValue, setSearchFieldValue] = useState({
    visitor_address: '',
    visitor_name: '',
    visitor_email: '',
    visitor_phone: ''
  })

  const [dateTime, setDateTime] = useState({
    gte: getDefaultStartDate(),
    lte: getCurrentDateTime(),
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setSearchFieldValue({
      ...searchFieldValue,
      [name]: value,
    });

  }

  const handleDateChange = (e) => {
    let { name, value } = e.target;
    setDateTime({
      ...dateTime,
      [name]: value
    })
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pageCount, setPageCount] = React.useState(0);
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

  let tableData = [];

  async function getVisitingTimesAndVisitors(queries, pageNo, rows) {

    queries.push({
      "range": {
        "visit_date_time": {
          "gte": dateTime.gte,
          "lte": dateTime.lte
        }
      }
    })

    try {
      setLoading(true);
      const visitingTimesResponse = await visitingTimesResponseData(queries, pageNo, rows);

      setLoading(false);
      setPageCount(visitingTimesResponse.data.hits.total.value)

      tableData = visitingTimesResponse.data.hits.hits.map(element => {
        const dateTime = new Date(element._source.visit_date_time);   
        return ({
          name: element._source.visitor_name,
          timeOfVisit: dateTime.toLocaleString(),
          email: element._source.visitor_email,
          phone: element._source.visitor_phone,
          address: element._source.visitor_address,
        })
      });

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
        <SelectPoliceStation />
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