import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { css } from "@emotion/react";
import * as config from "../../../GlobalConfig/config";
import { baseUrls } from "../../../GlobalConfig/config";
import SelectSubordinate from "./SelectSubordinate";

const ViewTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("all");
  const [step, setStep] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [tableData, setTableData] = useState([]);
  const [officerName1, setofficerName1] = useState('');
  const [officerName2, setofficerName2] = useState('');
  const [result, setResult] = useState({})


  const tableContainerStyles = css`
  margin-top: 30px;
`;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [pageCount, setPageCount] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    handleSubmit(newPage, rowsPerPage)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    handleSubmit(0, event.target.value);
  };

  const getDefaultStartDate = () => {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Clear time portion
    oneWeekAgo.setHours(0, 0, 0, 0);

    const formattedStartDate = oneWeekAgo.toISOString().slice(0, 10);
    return formattedStartDate;
  };

  console.log(getDefaultStartDate());



  const getCurrentDate = () => {
    // Get the current date
    const currentDate = new Date();

    // Add 5 hours and 30 minutes to the current date
    currentDate.setHours(currentDate.getHours() + 5);
    currentDate.setMinutes(currentDate.getMinutes() + 30);

    // Extract the date part
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Format the date as a string (YYYY-MM-DD)
    const formattedCurrentDate = `${year}-${month}-${day}`;

    console.log(formattedCurrentDate);
    return formattedCurrentDate;
  };

  // Test the function
  console.log(getCurrentDate());


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
    lte: getCurrentDate(),
  });

  const handleDateChange = (e) => {
    console.log("Handling date change");
    const { name, value } = e.target;
    setDateTime({
      ...dateTime,
      [name]: value
    })
  }


  useEffect(() => {
    // handleSubmit(page, rowsPerPage);
  }, []);

  const [tableOpen, setTableOpen] = useState(false)

  const handleSubmit = (pageNo, rows) => {
    setTableOpen(true)
    console.log("calling handleSubmit")
    const queryOptions = []

    queryOptions.push({
      match: {
        assigned_to_id: localStorage.getItem("subordinateId")
      }
    })

    if (status === "true") {
      queryOptions.push({
        match: {
          is_done: true
        }
      });
    }

    if (status === "false") {
      queryOptions.push({
        match: {
          is_done: false
        }
      });
    }

    if (status === "passed") {
      queryOptions.push({
        "range": {
          "deadline": {
            "lt": getCurrentDate()
          }
        }
      });
    }
    fetchTasks(queryOptions, pageNo, rows);
  };

  async function fetchTasks(queries, pageNo, rows) {

    queries.push({
      "range": {
        "assigned_time": {
          "gte": dateTimeConversion(dateTime.gte),
          "lte": dateTimeConversion(dateTime.lte)
        }
      }
    })
    console.log(queries)

    try {
      const response = await axios({
        method: 'post',  // Use 'post' method for sending data in the request body
        url: `${baseUrls.elasticSearchUrl}/tasks/_search`,
        headers: {
          Authorization: "Basic " + btoa(config.elasticSearchUserName + ":" + config.elasticSearchPassword),
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
              "assigned_time": {
                "order": "desc"
              }
            }
          ],
          "from": (pageNo * rows),
          "size": rows
        }

      });

      console.log('Visit time:', response);

      setPageCount(response.data.hits.total.value)

      const arr = []

      response.data.hits.hits.forEach(element => {


        const dateTimeString = element._source.deadline;
        const dateTimeString2 = element._source.assigned_time;
        const dateTime = new Date(dateTimeString);
        const dateTime2 = new Date(dateTimeString2);

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
        const formattedDateTime2 = dateTime2.toLocaleDateString('en-US', options);


        arr.push({ id: element._source.id, title: element._source.title, assignedTime: formattedDateTime2, deadline: formattedDateTime, status: element._source.is_done, description: element._source.description, assigned_to_id: element._source.assigned_to_id, assigned_by_id: element._source.assigned_by_id })
      });
      console.log(arr)
      setTableData(arr);

    } catch (error) {
      console.error('Error:', error);
    }
  }

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

  const togglestatus = async (event, task) => {
    // Prevent event propagation
    // console.log("clicked")
    event.stopPropagation();
    // Make task status done from due or vice versa
    try {
      // console.log(task)
      const requestData = {
        taskId: task.id,
        title: task.title,
        description: task.description,
        is_done: !task.status // Toggle the status from true to false or vice versa
      };

      // Make the HTTP request to the API endpoint
      const response = await axios.post(
        `${baseUrls.backEndUrl}/task/manage/task-update/add-update`,
        requestData, {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`,
        }
      }
      );

      // Handle the response
      console.log('Task update response:', response.data);


      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      event.stopPropagation();
    }
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

  const namefromid = async (id1, id2) => {
    try {
      const userResponse = await axios({
        method: 'post',  // Use 'post' method for sending data in the request body
        url: `${baseUrls.elasticSearchUrl}/officer_repository/_search`,
        headers: {
          Authorization: "Basic " + btoa(config.elasticSearchUserName + ":" + config.elasticSearchPassword),
          'Content-Type': 'application/json',
      },
        data:
        {
          "query": {
            "match": {
              "id": id1
            }
          }
        }
      });

      setofficerName1(userResponse.data.hits.hits[0]._source.name);
      const userResponse1 = await axios({
        method: 'post',  // Use 'post' method for sending data in the request body
        url: `${baseUrls.elasticSearchUrl}/officer_repository/_search`,
        headers: {
          Authorization: "Basic " + btoa("elastic" + ":" + "ilovePython123@"),
          'Content-Type': 'application/json',
        },
        data:
        {
          "query": {
            "match": {
              "id": id2
            }
          }
        }
      });

      setofficerName2(userResponse1.data.hits.hits[0]._source.name);


    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const updatetask = async () => {

    handleCloseDialog();
    try {
      // Prepare the data for the task update request
      const requestData = {
        taskId: Number(selectedTask?.id),
        title: title,
        description: description,
      };

      axios
        .post(`${baseUrls.backEndUrl}/task/manage/task-update/add-update`, requestData, {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem('token')}`,
          }
        })
        .then((res) => res.json())
        .then((res) => { console.log(res); setResult(res) })
        .catch((err) => {
          console.log(err);
        });

      console.log('Task update response:', result.data);

      setStep(1); // Return to step 1 (task list view) after updating the task
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  async function fetchTaskUpdateDetails(taskId) {

    try {
      const response = await axios({
        method: 'post',  // Use 'post' method for sending data in the request body
        url: `${baseUrls.elasticSearchUrl}/task_updates/_search`,
        headers: {
          Authorization: "Basic " + btoa(config.elasticSearchUserName + ":" + config.elasticSearchPassword),
          'Content-Type': 'application/json',
      },
        data: {
          "query": {
            "match": {
              "task_id": taskId
            }
          }
        }

      });

      console.log('task up:', response.data.hits.hits[0]._source);

      setUpdateDescription(response.data.hits.hits[0]._source.description)
      setUpdateTitle(response.data.hits.hits[0]._source.title)
      setTitle("");
      setDescription("")

    } catch (error) {
      console.error('Error:', error);
    }
  }


  const handleTaskClick = (task) => {
    const tagName = window.event.target.tagName.toLowerCase();
    if (tagName !== "button") {
      setSelectedTask(task);
      namefromid(task.assigned_to_id, task.assigned_by_id)
      // get task Details
      fetchTaskUpdateDetails(task.id);

    }
  };




  const handleCloseDialog = () => {
    setSelectedTask(null);
    setofficerName2(null);
    setofficerName1(null);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "hidden",
          overflowX: "hidden",
        }}
      >
        {step === 1 && (
          <div style={{ margin: "20px 40px" }}>
            <SelectSubordinate />
            <div style={{ marginTop: "20px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <InputLabel sx={{ marginRight: "10px" }} id="status-label">Status</InputLabel>
              <FormControl sx={{ marginRight: "20px" }}>
                <Select
                  labelId="status-label"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="false">Due</MenuItem>
                  <MenuItem value="true">Done</MenuItem>
                  <MenuItem value="passed">Passed</MenuItem>
                </Select>
              </FormControl>
              <InputLabel sx={{ marginRight: "10px" }} id="from-date-label">From</InputLabel>
              <FormControl sx={{ marginRight: "20px" }}>
                <input
                  name="gte"
                  type="date"
                  id="from-date"
                  value={dateTime.gte}
                  onChange={(e) => handleDateChange(e)} // This line needs to be changed
                  style={{ padding: "10px" }}
                />


              </FormControl>
              <InputLabel sx={{ marginRight: "10px" }} id="to-date-label">To</InputLabel>
              <FormControl sx={{ marginRight: "20px" }}>
                <input
                  name="lte"
                  type="date"
                  id="to-date"
                  value={dateTime.lte}
                  onChange={(e) => handleDateChange(e)} // This line needs to be changed
                  style={{ padding: "10px" }}
                />

              </FormControl>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => handleSubmit(page, rowsPerPage)} // Wrap handleSubmit in an anonymous function
              >
                Filter
              </Button>

            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {tableOpen && <TableContainer
                component={Paper}
                css={tableContainerStyles}
                sx={{
                  border: "0.5px solid  #979797",
                  width: "950px"
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: config.color.color5 }}>
                      <TableCell sx={{ color: config.color.color9, fontSize: "20px" }}>Task No</TableCell>
                      <TableCell sx={{ color: config.color.color9, fontSize: "20px" }}>Task Title</TableCell>
                      <TableCell sx={{ color: config.color.color9, fontSize: "20px" }}>Assigned Time</TableCell>
                      <TableCell sx={{ color: config.color.color9, fontSize: "20px" }}>Deadline</TableCell>
                      <TableCell sx={{ color: config.color.color9, fontSize: "20px" }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ cursor: 'pointer' }}>
                    {tableData
                      .map((task, index) => (
                        <TableRow key={task.id} sx={{ '&:hover': { backgroundColor: config.color.color8 } }} onClick={() => handleTaskClick(task)}>
                          <TableCell sx={{ paddingLeft: "80px" }}>{page * rowsPerPage + index + 1}</TableCell>
                          <TableCell sx={{ paddingRight: "80px" }}>{task.title}</TableCell>
                          <TableCell>{task.assignedTime}</TableCell>
                          <TableCell>{task.deadline}</TableCell>
                          <TableCell>


                            <Typography variant="body1" display="inline">
                              {task.status === false && new Date(task.deadline) >= new Date() && (
                                <ScheduleIcon
                                  sx={{ color: orange[500], verticalAlign: "middle" }} onClick={(event) => { togglestatus(event, task) }}
                                />
                              )}
                              {new Date(task.deadline) < new Date() && task.status === false && (
                                <ErrorIcon
                                  sx={{ color: red[500], verticalAlign: "middle" }}
                                />
                              )}
                              {task.status === true && (
                                <DoneIcon
                                  sx={{ color: green[500], verticalAlign: "middle" }} onClick={(event) => { togglestatus(event, task) }}
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
                  count={pageCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}

                />
              </TableContainer>}
            </div>
            <Dialog open={selectedTask !== null} onClose={handleCloseDialog} >
              <DialogTitle>Task Assigned by You</DialogTitle>
              <DialogContent dividers sx={{ overflowX: "hidden", width: "500px", justifyContent: "flex-start" }}>
                <Typography variant="body1">Assigned to: {officerName1}</Typography>
                <Typography variant="body1">Assigned Time: {selectedTask?.assignedTime}</Typography>
                <Typography variant="body1">Deadline: {selectedTask?.deadline}</Typography>
                <Typography variant="body1">Title: {selectedTask?.title}</Typography>
                <Typography variant="body1">Description: {selectedTask?.description}</Typography>
                {/* Additional content for tasks with status as "done" */}

                {selectedTask?.status === true && (

                  <DialogContent sx={{ overflowX: "hidden", justifyContent: "flex-start", padding: "2px" }}>
                    <Typography variant="h6" style={{ marginTop: 20, color: config.color.color5, justifyContent: "flex-start" }}>Response</Typography>
                    <Typography variant="body1">Title: {updateTitle}</Typography>
                    <Typography variant="body1">Description: {updateDescription}</Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        // Implement your logic for downloading updated documents here
                        console.log("Download documents");
                      }}

                    >
                      Download Documents
                    </Button>
                  </DialogContent>

                )}
              </DialogContent>

              <DialogActions >
                <Button onClick={handleCloseDialog}>Close</Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
        {step === 2 && selectedTask?.status !== true && (new Date(selectedTask?.deadline) > new Date()) && (
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
                <Button variant="contained" onClick={updatetask}>
                  Update Task
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </div>
    </>
  );
};

export default ViewTaskPage;



