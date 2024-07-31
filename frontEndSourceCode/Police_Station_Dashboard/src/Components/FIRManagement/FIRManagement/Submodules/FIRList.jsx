import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, CssBaseline, TablePagination, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

import * as config from "../../../../GlobalConfig/config";
import { getFIRs } from '../Utilities/Queries';

const theme = createTheme({
  palette: {
    primary: {
      main: config.color5,
    }
  },
});

const FIRs = [
  { date: '04.12.23', id: 1, filedBy: 'Ramesh Kumar', status: 'pending' },
  { date: '04.12.23', id: 2, filedBy: 'Anupam Roy', status: 'pending' },
  { date: '04.12.23', id: 3, filedBy: 'Aditi Mishra', status: 'pending' },
  { date: '04.12.23', id: 4, filedBy: 'Pinki', status: 'pending' },
  { date: '04.12.23', id: 5, filedBy: 'Gopal', status: 'pending' },
  { date: '04.12.23', id: 6, filedBy: 'Ratan', status: 'pending' },
];

const FIRList = ({ setFirDetails, setStep }) => {
  const [firList, setFirList] = useState([])
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getFIRs(setFirList);
  }, [])

  console.log(firList)

  function getObjectById(id) {
    for (let i = 0; i < firList.length; i++) {
      if (firList[i]._source.id === id) {
        console.log(firList[i]._source)
        return firList[i]._source;
      }
    }
    return null;
  }

  const onRowClick = (id) => {
    setFirDetails(getObjectById(id));
    setStep(2);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ marginTop: '50px', textAlign: 'left', width: "80%" }}>
        <Typography variant="h4" gutterBottom>
          Filed FIRs
        </Typography>
        <TableContainer component={Paper} sx={{ marginBottom: '50px' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: config.color5 }} >
                <TableCell><Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
                  Date
                </Typography></TableCell>
                <TableCell><Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
                  FIR ID
                </Typography></TableCell>
                <TableCell><Typography variant="h5" gutterBottom sx={{ color: 'white' }} >
                  Filed By
                </Typography></TableCell>
                <TableCell><Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
                  Status
                </Typography></TableCell>
                <TableCell><Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
                  Details
                </Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? firList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : firList
              ).map((fir) => (
                <TableRow key={fir._source.id} hover onClick={() => onRowClick(fir._source.id)} >
                  <TableCell>{fir._source.submissionTime}</TableCell>
                  <TableCell>{fir._source.id}</TableCell>
                  <TableCell>{fir._source.complainant_name}</TableCell>
                  {(fir.isClosed ?
                    <TableCell>Case Closed</TableCell> :
                    <TableCell>Pending</TableCell>)}
                  <TableCell>
                    <IconButton onClick={() => onRowClick(fir._source.id)}>
                      <ArrowOutwardIcon color='primary' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={FIRs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Container>
    </ThemeProvider>
  );
};

export default FIRList;
