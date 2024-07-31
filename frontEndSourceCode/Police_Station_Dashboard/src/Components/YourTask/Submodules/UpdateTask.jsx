import React from "react";
import { Button, Box, IconButton, Typography, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { renderFilePreviews } from "./RenderFilePreviews";
import { handleUpload } from "../Utilities/Functions";
import { updatetask } from "../Utilities/Queries";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UpdateTask = ({ title, setTitle, description, setDescription, files, openDialog, handleFileChange, selectedFile, setFiles, setSelectedFile, setOpenDialog, handleCloseDialog, selectedTask, setStep}) => {
    return (
        <Box style={{ margin: '50px auto', maxWidth: '600px', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <IconButton onClick={() => setStep(1)}><ArrowBackIcon /></IconButton>
            <Typography variant="h5">Update Task</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                    {renderFilePreviews(files, setFiles)}
                  </Grid>
                </div>

                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                  <DialogTitle>Upload File</DialogTitle>
                  <DialogContent>
                    <input
                      type="file"
                      onChange={(event) => handleFileChange(event, setSelectedFile)}
                      style={{ marginBottom: 10 }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => handleUpload(selectedFile, setFiles, files, setSelectedFile, setOpenDialog)}>Upload</Button>
                  </DialogActions>
                </Dialog>
                <Button variant="contained" onClick={() => updatetask(handleCloseDialog, selectedTask, title, description, setStep)}>
                  Update Task
                </Button>
              </Grid>
            </Grid>
          </Box>
    );
};

export default UpdateTask;
