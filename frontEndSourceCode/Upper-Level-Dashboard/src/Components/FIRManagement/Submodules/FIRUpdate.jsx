import React from 'react';
import { Card, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const dummyTaskData =  [
    {
      date: '2024-03-14',
      title: 'Dummy Task 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?". But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"'
    },
    {
      date: '2024-03-15',
      title: 'Dummy Task 2',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      date: '2024-03-15',
      title: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
    },
    {
      date: '2024-03-15',
      title: 'Dummy Task 2',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      date: '2024-03-15',
      title: 'Dummy Task 2',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    // Add more dummy task data as needed
  ];

const FIRUpdate = () => {
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
