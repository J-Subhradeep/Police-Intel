import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Container, Grid, CssBaseline, TablePagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import * as config from "../../../GlobalConfig/config";

import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: config.color.color5,
    }
  },
});

const FIRListingMain = ({ FIRs }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFIR, setSelectedFIR] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  // const handleOpenDialog = (fir) => {
  //   setSelectedFIR(fir);
  //   setOpenDialog(true);
  // };

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  // };


  const navigate = useNavigate();


  // const firListClick = 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
                  Description
                </Typography></TableCell>
                <TableCell><Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
                  Status
                </Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? FIRs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : FIRs
              ).map((fir) => (
                <TableRow key={fir.id} hover onClick={() =>{
    navigate(`/manageFIR/${fir.id}`)
  }} >
                  <TableCell>{fir.date}</TableCell>
                  <TableCell>{fir.id}</TableCell>
                  <TableCell>{fir.description.slice(0, 20) + (fir.description.length > 20 ? '...' : '')}</TableCell>
                  <TableCell>{fir.status}</TableCell>
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

export default FIRListingMain;
