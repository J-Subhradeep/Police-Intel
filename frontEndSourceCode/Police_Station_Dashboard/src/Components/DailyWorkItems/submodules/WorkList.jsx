import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, FormControl, InputLabel, TablePagination, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { css } from "@emotion/react";
import * as config from "../../../GlobalConfig/config";
import { getCurrentDate, getDefaultStartDate } from "../Utilities/Functions";
import { getOfficer, getWorkItems } from "../Utilities/Queries";

const tableContainerStyles = css`
  margin-top: 30px;
`;

const WorkList = () => {
  const [toDate, setToDate] = useState(getCurrentDate());
  const [fromDate, setFromDate] = useState(getDefaultStartDate());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [officerName, setofficerName] = useState('');

  const handleSearch = () => {
    getWorkItems(setTableData, fromDate, toDate);

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTaskClick = (task) => {
    const tagName = window.event.target.tagName.toLowerCase();
    if (tagName !== "button") {
      setSelectedTask(task);
      getOfficer(task.doneId, setofficerName)
    }
  };

  React.useEffect(() => {
    getWorkItems(setTableData, fromDate, toDate);
  }, [])


  return (
    <>
        <div style={{ margin: "20px 40px", width: '100%' }}>
          <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <InputLabel sx={{ marginRight: "10px" }} id="from-date-label">From</InputLabel>
            <FormControl sx={{ marginRight: "20px" }}>
              <input
                type="date"
                id="from-date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                style={{ padding: "10px" }}
              />
            </FormControl>
            <InputLabel sx={{ marginRight: "10px" }} id="to-date-label">To</InputLabel>
            <FormControl sx={{ marginRight: "20px" }}>
              <input
                type="date"
                id="to-date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                style={{ padding: "10px" }}
              />
            </FormControl>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
            >
              Filter
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TableContainer
              component={Paper}
              css={tableContainerStyles}
              sx={{
                border: "0.5px solid  #979797",
                width: "70%"
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ background: config.color5 }}>
                    <TableCell sx={{ color: config.color9, fontSize: "20px", paddingLeft: "70px" }}></TableCell>
                    <TableCell sx={{ color: config.color9, fontSize: "20px" }}>Title</TableCell>
                    <TableCell sx={{ color: config.color9, fontSize: "20px" }}>Submitted Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ cursor: 'pointer' }}>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((task, index) => (
                      <TableRow key={task.id} sx={{ '&:hover': { backgroundColor: config.color8 } }} onClick={() => handleTaskClick(task)}>
                        <TableCell sx={{ paddingLeft: "95px" }}>{index+1}</TableCell>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.submittedTime}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </div>
          <Dialog open={selectedTask !== null} onClose={()=> setSelectedTask(null)} maxWidth="sm" fullWidth>
            {selectedTask && (
              <React.Fragment>
                <DialogTitle>
                  <IconButton onClick={()=> setSelectedTask(null)} sx={{ position: 'absolute', right: '8px', top: '8px' }}>
                    <CloseIcon />
                  </IconButton>
                  {selectedTask.submittedTime}
                </DialogTitle>
                <DialogContent dividers sx={{ maxHeight: '500px', overflowY: 'auto' }}>
                  <Typography variant="h6">Work done by: {officerName}, id: {selectedTask.id}</Typography>
                  <Typography variant="h6">Title: {selectedTask.title}</Typography>
                  <Typography variant="body1">Description: {selectedTask.description}</Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'flex-start' }}>
                  <Button onClick={() => console.log('Downloading documents...')} color="primary">Download Documents</Button>
                </DialogActions>
              </React.Fragment>
            )}
          </Dialog>
        </div>
    </>
  );
};

export default WorkList;