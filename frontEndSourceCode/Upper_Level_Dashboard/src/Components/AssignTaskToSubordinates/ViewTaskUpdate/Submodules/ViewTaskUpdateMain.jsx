import React, { useState } from "react";
import {
  Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import * as config from "../../../../GlobalConfig/config";
import SelectSubordinate from "../../../Common/SelectSubordinate/SelectSubordinate";
import { getCurrentDate, getDefaultStartDate, handleSubmit } from "../Utilities/Functions";
import { fetchTaskUpdateDetails, namefromid } from "../Utilities/Queries";
import FilterOptions from "./FilterOptions";
import TaskTable from "./TaskTable";

const ViewTaskUpdateMain = () => {
  const [status, setStatus] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [tableData, setTableData] = useState([]);
  const [officerName1, setofficerName1] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [pageCount, setPageCount] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    handleSubmit(newPage, rowsPerPage, setTableOpen, status, setPageCount, setTableData, dateTime)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    handleSubmit(0, event.target.value, setTableOpen, status, setPageCount, setTableData, dateTime);
  };

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

  const [tableOpen, setTableOpen] = useState(false)

  const handleTaskClick = (task) => {
    const tagName = window.event.target.tagName.toLowerCase();
    if (tagName !== "button") {
      setSelectedTask(task);
      namefromid(task.assigned_to_id, setofficerName1)
      fetchTaskUpdateDetails(task.id, setUpdateDescription, setUpdateTitle);
    }
  };

  const handleCloseDialog = () => {
    setSelectedTask(null);
    setofficerName1(null);
  };


  return (
    <>
      <div
        style={{
          height: "calc(100vh - 4.3rem)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
          <div style={{ margin: "20px 40px" }}>

            <SelectSubordinate />

            <FilterOptions dateTime={dateTime} handleDateChange={handleDateChange} page={page} rowsPerPage={rowsPerPage} setPageCount={setPageCount} setStatus={setStatus} setTableData={setTableData} setTableOpen={setTableOpen} status={status} />

            <TaskTable handleTaskClick={handleTaskClick} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} page={page} pageCount={pageCount} rowsPerPage={rowsPerPage} tableData={tableData} tableOpen={tableOpen} />

            <Dialog open={selectedTask !== null} onClose={handleCloseDialog} >
              <DialogTitle>Task Assigned by You</DialogTitle>
              <DialogContent dividers sx={{ overflowX: "hidden", width: "500px", justifyContent: "flex-start" }}>
                <Typography variant="body1">Assigned to: {officerName1}</Typography>
                <Typography variant="body1">Assigned Time: {selectedTask?.assignedTime}</Typography>
                <Typography variant="body1">Deadline: {selectedTask?.deadline}</Typography>
                <Typography variant="body1">Title: {selectedTask?.title}</Typography>
                <Typography variant="body1">Description: {selectedTask?.description}</Typography>

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
                {selectedTask?.status === false && (

                  <DialogContent sx={{ overflowX: "hidden", justifyContent: "flex-start", padding: "2px" }}>
                    <Typography variant="h6" style={{ marginTop: 20, color: "red", justifyContent: "flex-start" }}>No Response</Typography>
                  </DialogContent>

                )}
              </DialogContent>

              <DialogActions >
                <Button onClick={handleCloseDialog}>Close</Button>
              </DialogActions>
            </Dialog>
          </div>
      </div>
    </>
  );
};

export default ViewTaskUpdateMain;