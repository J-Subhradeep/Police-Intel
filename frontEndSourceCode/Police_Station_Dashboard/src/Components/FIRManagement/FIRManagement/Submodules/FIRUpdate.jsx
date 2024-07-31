import React from 'react';
import { Card, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const dummyTaskData =  [
    {
      date: '2024-03-14',
      title: 'Autopsy conducted',
      description: 'Autopsy conducted to determine the cause of death. Interviews with individuals who were in contact with the victim prior to his death.'
    },
    {
      date: '2024-03-20',
      title: 'Examination of forensic evidence',
      description: 'Examination of forensic evidence, including fingerprints, DNA samples, and footprints found at the scene. Review of surveillance footage from nearby cameras.'
    },
    {
      date: '2024-03-25',
      title: 'Questioning of potential suspects',
      description: 'Expansion of the investigation to include questioning of potential suspects based on evidence and alibis.'
    },
    {
      date: '2024-03-27',
      title: 'Further investigation',
      description: 'Analysis of financial records and personal relationships of the victim to identify possible motives.'
    },
    // Add more dummy task data as needed
  ];

const FIRUpdate = ({firId}) => {
  const [selectedTask, setSelectedTask] = React.useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseDialog = () => {
    setSelectedTask(null);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px',marginBottom: '50px' }}>
      {dummyTaskData.map((task, index) => (
        <React.Fragment key={index}>
          <Card style={{ width: '300px', margin: '10px', padding: '10px' }}>
            <Typography variant="h6">{task.date}</Typography>
            <Typography variant="subtitle1">{task.title}</Typography>
            <Button onClick={() => handleTaskClick(task)}>Learn More</Button>
          </Card>
          {index < dummyTaskData.length - 1 && (
            <div style={{ width: '2px', backgroundColor: 'blue', margin: '0 auto', height: '50px' }}></div>
          )}
        </React.Fragment>
      ))}
      <Dialog open={Boolean(selectedTask)} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedTask && (
          <React.Fragment>
            <DialogTitle>
              <IconButton onClick={handleCloseDialog} sx={{ position: 'absolute', right: '8px', top: '8px' }}>
                <CloseIcon />
              </IconButton>
              {selectedTask.date}
            </DialogTitle>
            <DialogContent dividers sx={{ maxHeight: '500px', overflowY: 'auto' }}>
              <Typography variant="h6">{selectedTask.title}</Typography>
              <Typography variant="body1">{selectedTask.description}</Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-start' }}>
              <Button onClick={() => console.log('Downloading documents...')} color="primary">Download Documents</Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </div>
  );
};

export default FIRUpdate;
