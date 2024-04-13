import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Box, IconButton, TextField, Select, MenuItem, FormControl, InputLabel, TablePagination, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import { orange, red, green } from "@mui/material/colors";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { css } from "@emotion/react";
import * as config from "../../../GlobalConfig/config";

const tasksData = [
  { id: 1, title: "Task 1", assignedTime: "2024-2-12", deadline: "2024-03-15", status: "due", description: "Description of Task 1" },
  { id: 2, title: "Task 2", assignedTime: "2024-2-12", deadline: "2024-03-16", status: "passed", description: "Description of Task 2" },
  { id: 3, title: "Task 3", assignedTime: "2024-2-12", deadline: "2024-03-14", status: "done", description: "Description of Task 3" },
  { id: 4, title: "Task 4", assignedTime: "2024-2-12", deadline: "2024-03-17", status: "done", description: "Description of Task 4" },
  { id: 5, title: "Task 5", assignedTime: "2024-2-12", deadline: "2023-03-18", status: "done", description: "Description of Task 5" },
  { id: 6, title: "Task 6", assignedTime: "2024-2-12", deadline: "2024-03-12", status: "done", description: "Description of Task 6" },
];

const tableContainerStyles = css`
  margin-top: 30px;
`;

const TaskList = () => {
  const [tasks, setTasks] = useState(tasksData);
  const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState("due");
  const [page, setPage] = useState(0);
  const [step, setStep] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [files, setFiles] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


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
    console.log("Status:", status);
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
    }
  };

  const handleCloseDialog = () => {
    setSelectedTask(null);
  };

  const markAsDone = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: "done" } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <>
      {step === 1 && (
        <div style={{ margin: "20px 40px" }}>
          <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <InputLabel sx={{ marginRight: "10px" }} id="status-label">Status</InputLabel>
            <FormControl sx={{ marginRight: "20px" }}>
              <Select
                labelId="status-label"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="due">Due</MenuItem>
                <MenuItem value="passed">Passed</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
            </FormControl>
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
                width: "80%"
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ background: config.color.color5 }}>
                    <TableCell sx={{ color: config.color.color9, fontSize: "20px", paddingLeft: "70px" }}>Task No</TableCell>
                    <TableCell sx={{ color: config.color.color9, fontSize: "20px" }}>Task Title</TableCell>
                    <TableCell sx={{ color: config.color.color9, fontSize: "20px" }}>Assigned Time</TableCell>
                    <TableCell sx={{ color: config.color.color9, fontSize: "20px" }}>Deadline</TableCell>
                    <TableCell sx={{ color: config.color.color9, fontSize: "20px" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{cursor: 'pointer'}}>
                  {tasks
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((task, index) => (
                      <TableRow key={task.id} sx={{ '&:hover': { backgroundColor: config.color.color8 } }} onClick={() => handleTaskClick(task)}>
                        <TableCell sx={{ paddingLeft: "80px" }}>{index + 1}</TableCell>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.assignedTime}</TableCell>
                        <TableCell>{task.deadline}</TableCell>
                        <TableCell>
                          <Typography variant="body1" display="inline">
                            {task.status === "due" && (
                              <ScheduleIcon
                                sx={{ color: orange[500], verticalAlign: "middle" }}
                              />
                            )}
                            {task.status === "passed" && (
                              <ErrorIcon
                                sx={{ color: red[500], verticalAlign: "middle" }}
                              />
                            )}
                            {task.status === "done" && (
                              <DoneIcon
                                sx={{ color: green[500], verticalAlign: "middle" }}
                              />
                            )}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tasks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </div>
          <Dialog open={selectedTask !== null} onClose={handleCloseDialog} >
            <DialogTitle>{selectedTask?.title}</DialogTitle>
            <DialogContent sx={{ width: "500px", height: "200px" }}>
              <Typography variant="body1">Deadline: {selectedTask?.deadline}</Typography>
              <Typography variant="body1">Description: {selectedTask?.description}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button variant="contained" onClick={() => setStep(2)}>Update Task</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      {step === 2 && (
        <Box style={{ margin: '50px auto', maxWidth: '600px', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <IconButton onClick={() => setStep(1)}><ArrowBackIcon /></IconButton>
          <Typography variant="h5">Update Task</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Title"
                value={title}
                onChange={handleTitleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                fullWidth
                multiline
                margin="normal"
              />
              <div style={{ marginBottom: 20 }}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenDialog(true)}
                  style={{ marginBottom: 10 }}
                >
                  Add Files
                </Button>
                <Grid container spacing={1}>
                  {renderFilePreviews()}
                </Grid>
              </div>
              <Button variant="contained" onClick={() => setStep(2)}>
                Update Task
              </Button>

              <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Upload File</DialogTitle>
                <DialogContent>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ marginBottom: 10 }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleUpload}>Upload</Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default TaskList;
