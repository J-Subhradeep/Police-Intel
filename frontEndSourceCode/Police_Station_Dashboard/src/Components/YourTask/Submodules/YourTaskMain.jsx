import React, { useState, useEffect } from "react";
import { getCurrentDate, getDefaultStartDate, handleFileChange, handleSubmit } from "../Utilities/Functions";
import { fetchTaskUpdateDetails, namefromid } from "../Utilities/Queries";
import FilterOptions from "./FilterOptions";
import TableComponent from "./TableComponent";
import DialogueModule from "./DialogueModule";
import UpdateTask from "./UpdateTask";

const YourTaskMain = () => {
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [pageCount, setPageCount] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    handleSubmit(newPage, rowsPerPage, setPageCount, setTableData, dateTime, status)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    handleSubmit(0, event.target.value, setPageCount, setTableData, dateTime, status);
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

  useEffect(() => {
    handleSubmit(page, rowsPerPage, setPageCount, setTableData, dateTime, status);
  }, []);

  const handleTaskClick = (task) => {
    const tagName = window.event.target.tagName.toLowerCase();
    if (tagName !== "button") {
      setSelectedTask(task);
      namefromid(task.assigned_to_id, task.assigned_by_id, setofficerName1, setofficerName2)
      fetchTaskUpdateDetails(task.id, setUpdateDescription, setUpdateTitle);

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
        style={{ height: "calc(100vh - 4.3rem)", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", overflowY: "scroll", overflowX: "hidden" }}>
        {step === 1 && (
          <div style={{ margin: "20px 40px" }}>

            <FilterOptions dateTime={dateTime} handleDateChange={handleDateChange} page={page} rowsPerPage={rowsPerPage} setPageCount={setPageCount} setStatus={setStatus} setTableData={setTableData} status={status} />

            <TableComponent dateTime={dateTime} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} page={page} pageCount={pageCount} rowsPerPage={rowsPerPage} handleTaskClick={handleTaskClick} tableData={tableData} />

            <DialogueModule handleCloseDialog={handleCloseDialog} officerName1={officerName1} officerName2={officerName2} selectedTask={selectedTask} setStep={setStep} updateDescription={updateDescription} updateTitle={updateTitle} />

          </div>
        )}
        {step === 2 && selectedTask?.status !== true && (new Date(selectedTask?.deadline) > new Date()) && (
          <UpdateTask description={description} files={files} handleCloseDialog={handleCloseDialog} handleFileChange={handleFileChange} openDialog={openDialog} selectedFile={selectedFile} selectedTask={selectedTask} setDescription={setDescription} setFiles={setFiles} setOpenDialog={setOpenDialog} setSelectedFile={setSelectedFile} setStep={setStep} setTitle={setTitle} title={title} />
        )}
      </div>
    </>
  );
};

export default YourTaskMain;