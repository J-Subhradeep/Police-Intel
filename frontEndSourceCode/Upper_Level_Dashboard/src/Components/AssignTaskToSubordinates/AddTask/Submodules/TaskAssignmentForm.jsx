import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, TextField, Typography, Grid } from '@mui/material'
import React from 'react'
import { renderFilePreviews } from './RenderFilePreviews'
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const TaskAssignmentForm = ({taskTitle, setTaskTitle, description, setDescription, deadline, handleDeadlineChange, setOpenDialog, setFiles, files, handleNext, openDialog, handleUpload, handleFileChange}) => {
  return (
    <Stack style={{ width: '100%', display: 'flex', justifyContent: 'center', height: "calc(100vh - 4.3rem)", overflow: "hidden", }}>
          <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Typography variant='h5'>Task Assignment</Typography>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', height: "calc(100vh - 4.3rem)", overflowY: "scroll", overflowX: "hidden", }}>
            <Paper style={{ width: '55%', margin: 'auto', padding: '20px', marginTop: '30px' }}>
              <TextField
                label="Task Title"
                fullWidth
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                style={{ marginBottom: 20 }}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ marginBottom: 20 }}
              />
              <TextField
                label="Deadline (Days)"
                type="number" // Set type to "number" for numeric input
                value={deadline}
                onChange={handleDeadlineChange}
                InputLabelProps={{ shrink: true }}
                style={{ marginBottom: 20 }}
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
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', marginBottom: '20px' }}>
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color="primary"
                  disabled={taskTitle.trim() === '' || description.trim() === ''}
                >
                  Next <ArrowForwardIcon />
                </Button>
              </div>
            </Paper>
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
        </Stack>
  )
}

export default TaskAssignmentForm
