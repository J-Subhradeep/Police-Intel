import React, { useState } from 'react';
import { Paper, TextField, Button, Dialog, DialogTitle, DialogActions, DialogContent, IconButton, Grid, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const profiles = [
  { id: 1, name: 'John Doe', designation: 'Software Engineer' },
  { id: 2, name: 'Jane Smith', designation: 'UI/UX Designer' },
  { id: 4, name: 'Mike Johnson', designation: 'Product Manager' },
  { id: 5, name: 'Mike Johnson', designation: 'Product Manager' },
  { id: 6, name: 'Mike Johnson', designation: 'Product Manager' },
  { id: 7, name: 'Mike Johnson', designation: 'Product Manager' },
  { id: 8, name: 'Mike Johnson', designation: 'Product Manager' },
  { id: 9, name: 'Mike Johnson', designation: 'Product Manager' },
  { id: 10, name: 'Mike Johnson', designation: 'Product Manager' },
  { id: 11, name: 'Mike Johnson', designation: 'Product Manager' },
];

const AddTaskMain = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [files, setFiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [step, setStep] = useState(1); // 1: AddTaskMain, 2: AddTaskMain2
  const [selectedProfile, setSelectedProfile] = useState(null); // Selected profile state

  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredProfile, setHoveredProfile] = useState(null);

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleProfileHover = (profileId) => {
    setHoveredProfile(profileId);
  };

  const clearHoveredProfile = () => {
    setHoveredProfile(null);
  };

  const handleNext = () => {
    if (taskTitle.trim() !== '' && description.trim() !== '' && deadline.trim() !== '') {
      setStep(2);
    }
  };

  const handlePrevious = () => {
    setStep(1);
  };

  // Function to handle profile selection
  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setOpenDialog2(true);
  };

  return (
    <>
      {step === 1 && (
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
              label="Deadline"
              type="date"
              // fullWidth
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
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
                {renderFilePreviews()}
              </Grid>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', marginBottom: '20px'}}>
              <Button
                onClick={handleNext}
                variant="contained"
                color="primary"
                disabled={taskTitle.trim() === '' || description.trim() === '' || deadline.trim() === ''}
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
      )}

      {step === 2 && (
        <Stack spacing={0} style={{ width: '100%', display: 'flex', justifyContent: 'center', height: "calc(100vh - 4.3rem)", overflowY: "hidden", overflowX: "hidden", }}>
          <div style={{ width: '100%', height: '40%', }}>
            <IconButton onClick={handlePrevious} style={{ marginTop: '20px', marginLeft: '20px' }}>
              <ArrowBackIcon />
            </IconButton>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
              <Typography variant='h5'>Assign to</Typography>
            </div>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
              <TextField
                label="Search names..."
                placeholder="Search names..."
                variant="outlined"
                // fullWidth
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: '10px', width: "30%" }}
              />
            </div>
          </div>

          <Paper style={{ width: '55%', margin: 'auto', padding: '10px 20px 20px 20px', height: "60%" }}>
            <List sx={{ height: "100%", overflowY: 'scroll', overflowX: 'hidden' }}>
              {profiles
                .filter(profile => profile.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(profile => (
                  <ListItem
                    key={profile.id}
                    onMouseEnter={() => handleProfileHover(profile.id)}
                    onMouseLeave={clearHoveredProfile}
                    onClick={() => handleProfileSelect(profile)} // Call handleProfileSelect on profile click
                    style={{ backgroundColor: hoveredProfile === profile.id ? '#f0f0f0' : 'transparent', cursor: 'pointer' }} // Add cursor pointer style
                  >
                    <ListItemAvatar>
                      <Avatar alt={profile.name} src="dummy_avatar.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={profile.name}
                      secondary={<span style={{ fontSize: '0.8rem' }}>{profile.designation}</span>}
                    />
                  </ListItem>
                ))}
            </List>
          </Paper>
        </Stack>
      )}

      {/* Dialog box for profile assignment */}
      <Dialog open={openDialog2} onClose={() => setOpenDialog2(false)}>
        <DialogTitle>Assign Task</DialogTitle>
        <DialogContent>
          <Typography>Assign the task to {selectedProfile && selectedProfile.name}, {selectedProfile && selectedProfile.designation}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog2(false)}>Cancel</Button>
          <Button onClick={() => { /* Handle assignment */ }}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTaskMain;
