import React, { useState } from 'react';
import { Paper, TextField, Button, Dialog, DialogTitle, DialogActions, DialogContent, IconButton, Grid, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Stack } from '@mui/material';
import police from '../../../../assets/police.webp'
import { addWorkFunc, getOfficers } from '../Utilities/Queries';
import TaskAssignmentForm from './TaskAssignmentForm';
import OfficerList from './OfficerList';


const Task = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(0);
  const [files, setFiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState(null); 
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

  const handleNext = () => {
    if (taskTitle.trim() !== '' && description.trim() !== '') {
      setStep(2);
    }
  };

  const handleDeadlineChange = (event) => {
    const newDeadline = parseInt(event.target.value, 10);
    if (!isNaN(newDeadline)) {
      setDeadline(newDeadline);
    }
  };

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setOpenDialog2(true);
  };

  React.useEffect(() => {
    getOfficers(setofficers);
  }, [])

  const [officers, setofficers] = useState([]);

  const handleAssignment = () => {
    console.log(taskTitle)
    const workData = {
      title: taskTitle,
      description: description,
      assignedById: localStorage.getItem("userId"),
      assignedToId: selectedProfile.id,
      deadline: deadline
    }
    addWorkFunc(workData, setOpenDialog2, setStep, setTaskTitle, setDescription);
  }

  return (
    <>
      {step === 1 && (
        <TaskAssignmentForm deadline={deadline} description={description} files={files} handleDeadlineChange={handleDeadlineChange} handleFileChange={handleFileChange} handleNext={handleNext} handleUpload={handleUpload} openDialog={openDialog} setDescription={setDescription} setFiles={setFiles} setOpenDialog={setOpenDialog} setTaskTitle={setTaskTitle} taskTitle={taskTitle} />
      )}

      {step === 2 && (
        <OfficerList handleProfileSelect={handleProfileSelect} hoveredProfile={hoveredProfile} officers={officers} police={police} searchTerm={searchTerm} setHoveredProfile={setHoveredProfile} setSearchTerm={setSearchTerm} setStep={setStep}/>
      )}
      
      <Dialog open={openDialog2} onClose={() => setOpenDialog2(false)}>
        <DialogTitle>Assign Task</DialogTitle>
        <DialogContent>
          <Typography>Assign the task to {selectedProfile && selectedProfile.name}, {selectedProfile && selectedProfile.designation}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog2(false)}>Cancel</Button>
          <Button onClick={() => { handleAssignment() }}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Task;
