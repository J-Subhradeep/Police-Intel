import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, CssBaseline, TablePagination, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import * as config from "../../../GlobalConfig/config";

import { useNavigate } from 'react-router-dom';
import SelectPoliceStation from '../../Common/SelectPoliceStation/SelectPoliceStation';

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

const FIRList = ({ setStep, setFIRId }) => {
  const [showTable, setShoewTable] = useState(false)
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onRowClick = (id) => {
    setFIRId(id);
    setStep(2);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ height: 'calc(100vh - 4.3rem)', width: '100%', overflowY: 'scroll', overflowX: 'hidden' }}>
      <Container sx={{ marginTop: '50px', textAlign: 'left', width: "80%" }}>
        <SelectPoliceStation />
        <div style={{ width: "100%", display: "flex", justifyContent: 'center', alignItems: "center", margin: "20px" }}>
          <Button onClick={() => setShoewTable(true)} variant='contained'>Filter</Button>
        </div>
        {showTable && (<>
          <Typography variant="h5" gutterBottom>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? FIRs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : FIRs
                ).map((fir) => (
                  <TableRow key={fir.id} hover onClick={() => onRowClick(fir.id)} >
                    <TableCell>{fir.date}</TableCell>
                    <TableCell>{fir.id}</TableCell>
                    <TableCell>{fir.filedBy}</TableCell>
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
        </>)}
      </Container>
      </div>
    </ThemeProvider>
  );
};

export default FIRList;
