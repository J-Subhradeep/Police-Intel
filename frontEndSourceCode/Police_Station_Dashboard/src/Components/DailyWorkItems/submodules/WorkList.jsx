import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Box, IconButton, TextField, Select, MenuItem, FormControl, InputLabel, TablePagination, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { css } from "@emotion/react";
import * as config from "../../../GlobalConfig/config";
import axios from "axios";
import { baseUrls } from "../../../GlobalConfig/config";

const tasksData = [
  { id: 1, title: "Task 1", submittedTime: "2024-2-12", description: "Description of Task 1", doneBy: "Someone", file: "" },
  { id: 2, title: "Task 1", submittedTime: "2024-2-12", description: "Description of Task 1", doneBy: "Someone", file: "" },
  { id: 3, title: "Task 1", submittedTime: "2024-2-12", description: "Description of Task 1", doneBy: "Someone", file: "" },
  { id: 4, title: "Task 1", submittedTime: "2024-2-12", description: "Description of Task 1", doneBy: "Someone", file: "" },
  { id: 5, title: "Task 1", submittedTime: "2024-2-12", description: "Description of Task 1", doneBy: "Someone", file: "" },
];

const tableContainerStyles = css`
  margin-top: 30px;
`;

const WorkList = () => {
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

  // Get current date
  var currentDate = new Date();

  // Subtract 7 days from the current date
  var oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Extract the year, month, and day from the date
  var year = oneWeekAgo.getFullYear();
  var month = String(oneWeekAgo.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
  var day = String(oneWeekAgo.getDate()).padStart(2, '0');

  // Construct the formatted date string
  var formattedDate = year + '-' + month + '-' + day;

  // console.log("One week before the current date:", formattedDate);

  const [fromDate, setFromDate] = useState(formattedDate);


  const [page, setPage] = useState(0);
  const [step, setStep] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [files, setFiles] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tableData, setTableData] = useState([]);
  const [officerName, setofficerName] = useState('');


  const handleFileChange = (event) => {
    const fileList = event.target.files;
    setSelectedFile(fileList[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      setFiles([...files, selectedFile]);
      setSelectedFile(null);
      setOpenDialog(false);
    }
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const renderFilePreviews = () => {
    return files.map((file, index) => (
      <Grid item key={index}>
        <Paper elevation={3} style={{ padding: 10, display: 'flex', alignItems: 'center' }}>
          <Typography>{file.name}</Typography>
          <IconButton onClick={() => handleRemoveFile(index)}>
            <CloseIcon />
          </IconButton>
          <img src={URL.createObjectURL(file)} alt={file.name} style={{ marginLeft: 10, maxWidth: 100, maxHeight: 100 }} />
        </Paper>
      </Grid>
    ));
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching with the following parameters:");
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);
    // console.log("Status:", status);
    getWorkItems();

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
      setTitle(task.title);
      setDescription(task.description);
      getOfficer(task.doneId)
    }
  };

  async function getOfficer(id) {

    try {
      const userResponse = await axios({
        method: 'post',  // Use 'post' method for sending data in the request body
        url: `${baseUrls.elasticSearchUrl}/officer_repository/_search`,
        headers: {
          Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
          'Content-Type': 'application/json',
      },
        data:
        {
          "query": {
            "match": {
              "id": id
            }
          }
        }
      });

      setofficerName(userResponse.data.hits.hits[0]._source.name)

      // console.log(userResponse.data.hits.hits[0]._source.name)


    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleCloseDialog = () => {
    setSelectedTask(null);
  };

  React.useEffect(() => {
    getWorkItems()
  }, [])

  async function getWorkItems() {

    try {
      const userResponse = await axios({
        method: 'post',  // Use 'post' method for sending data in the request body
        url: `${baseUrls.elasticSearchUrl}/jobs/_search`,
        headers: {
          Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
          'Content-Type': 'application/json',
      },
        data:
        {
          "query": {
            "bool": {
              "must": [
                {
                  "match": {
                    "police_station_id": localStorage.getItem("PsId")
                  }
                },
                {
                  "range": {
                    "submit_time": {
                      "gte": "2024-03-15",
                      "lte": toDate
                    }
                  }
                }
              ]
            }
          },
          "sort": {
            "submit_time": {
              "order": "desc"
            }
          },
          "size": 1000
        }
      });

      // console.log(userResponse.data.hits.hits[0]._source)

      const arr = []

      userResponse.data.hits.hits.forEach(element => {


        const dateTimeString = element._source.submit_time;
        const dateTime = new Date(dateTimeString);

        // Format the date as desired
        const options = {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true // Display in 12-hour format with AM/PM
        };

        const formattedDateTime = dateTime.toLocaleDateString('en-US', options);

        arr.push({ id: element._source.id, title: element._source.title, submittedTime: formattedDateTime, description: element._source.description, doneId: element._source.done_id, file: element._source.file });
      });
      // console.log(arr)
      setTableData(arr);


    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      {step === 1 && (
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
                    <TableCell sx={{ color: config.color9, fontSize: "20px", paddingLeft: "70px" }}>Work Item Id</TableCell>
                    <TableCell sx={{ color: config.color9, fontSize: "20px" }}>Title</TableCell>
                    <TableCell sx={{ color: config.color9, fontSize: "20px" }}>Submitted Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ cursor: 'pointer' }}>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((task, index) => (
                      <TableRow key={task.id} sx={{ '&:hover': { backgroundColor: config.color8 } }} onClick={() => handleTaskClick(task)}>
                        <TableCell sx={{ paddingLeft: "95px" }}>{task.id}</TableCell>
                        {/* <TableCell>{task.id}</TableCell> */}
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
          {/* <Dialog open={selectedTask !== null} onClose={handleCloseDialog} >
            <DialogTitle>{selectedTask?.title}</DialogTitle>
            <DialogContent sx={{ width: "500px", height: "200px" }}>
              <Typography variant="body1">Deadline: {selectedTask?.deadline}</Typography>
              <Typography variant="body1">Description: {selectedTask?.description}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </Dialog> */}

          <Dialog open={selectedTask !== null} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            {selectedTask && (
              <React.Fragment>
                <DialogTitle>
                  <IconButton onClick={handleCloseDialog} sx={{ position: 'absolute', right: '8px', top: '8px' }}>
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
      )}
    </>
  );
};

export default WorkList;
