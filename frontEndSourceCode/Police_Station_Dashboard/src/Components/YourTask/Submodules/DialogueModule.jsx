import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, Typography, DialogActions } from "@mui/material";
import * as config from "../../../GlobalConfig/config";

const DialogueModule = ({ selectedTask, handleCloseDialog, officerName1, officerName2, updateTitle, updateDescription, setStep }) => {
    return (
        <Dialog open={selectedTask !== null} onClose={handleCloseDialog} >
        <DialogTitle>Task Assigned to You</DialogTitle>
        <DialogContent dividers sx={{ overflowX: "hidden", width: "500px", justifyContent: "flex-start" }}>
          <Typography variant="body1">Assigned to: {officerName1}</Typography>
          <Typography variant="body1">Assigned by: {officerName2}</Typography>
          <Typography variant="body1">Assigned Time: {selectedTask?.assignedTime}</Typography>
          <Typography variant="body1">Deadline: {selectedTask?.deadline}</Typography>
          <Typography variant="body1">Title: {selectedTask?.title}</Typography>
          <Typography variant="body1">Description: {selectedTask?.description}</Typography>

          {selectedTask?.status === true && (

            <DialogContent sx={{ overflowX: "hidden", justifyContent: "flex-start", padding: "2px" }}>
              <Typography variant="h6" style={{ marginTop: 20, color: config.color5, justifyContent: "flex-start" }}>Your Response</Typography>
              <Typography variant="body1">Title: {updateTitle}</Typography>
              <Typography variant="body1">Description: {updateDescription}</Typography>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
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

          {selectedTask?.status !== true && (new Date(selectedTask?.deadline) > new Date()) && (
            <Button variant="contained" onClick={() => {
              if (selectedTask?.status !== true)
                setStep(2)
            }}>Update Task</Button>)}
        </DialogActions>
      </Dialog>
    );
};

export default DialogueModule;
