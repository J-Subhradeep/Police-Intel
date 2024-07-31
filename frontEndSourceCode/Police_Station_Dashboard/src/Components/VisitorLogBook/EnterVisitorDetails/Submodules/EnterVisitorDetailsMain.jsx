import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { baseUrls } from '../../../../GlobalConfig/config';


const EnterVisitorDetailsMain = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isPresentOpen, setIsPresentOpen] = useState(false);
  const [presentVisitorId, setPresentVisitorId] = useState();
  const [recordAddedOpen, setRecordAddedOpen] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [doNavigate, setDoNavigate] = useState(false);

  const handleBackdropClose = () => {
    setOpenBackdrop(false);
  };
  const handleBackdropOpen = () => {
    setOpenBackdrop(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    console.log('Address:', address);
    enterVisitorDetails();
    handleBackdropOpen();
  };

  const handleExistingVisitor = () => {
    isPresentHandleClose();
    handleBackdropOpen();
    submitVisitingRecord();
  }

  const isPresentHandleOpen = () => {
    setIsPresentOpen(true);
  };

  const isPresentHandleClose = () => {
    setIsPresentOpen(false);
  };

  const recordAddedHandleOpen = () => {
    setRecordAddedOpen(true);
  };

  const recordAddedHandleClose = () => {
    setRecordAddedOpen(false);
    setDoNavigate(true)
  };

  async function enterVisitorDetails() {
    try {
      const postVisitorDetails = await axios({
        method: 'post',
        url: `${baseUrls.backEndUrl}/police-admin/visitors/create`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: {
          "visitorName": name,
          "visitorEmail": email,
          "visitorPhone": phoneNumber,
          "visitorAddress": address,
          "policeStationId": localStorage.getItem('PsId')
        }

      });

      handleBackdropClose();

      console.log(postVisitorDetails.data)

      if (!postVisitorDetails.data.present) {
        recordAddedHandleOpen();
      }

      if (postVisitorDetails.data.present) {
        isPresentHandleOpen();
        setPresentVisitorId(postVisitorDetails.data.data.id);
      }

    } catch (error) {
      handleBackdropClose();
      console.error('Error:', error);
    }
  }

  async function submitVisitingRecord() {
    try {
      const submit = await axios({
        method: 'post',
        url: `${baseUrls.backEndUrl}/police-admin/visitors/create_visit_entry`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: {
          "visitorId": presentVisitorId,
          "policeStationId": localStorage.getItem('PsId')
        }

      });

      handleBackdropClose();
      recordAddedHandleOpen();

      console.log(submit)

    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ height: 'calc(100vh - 5rem)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Enter Visitor Details
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 20 }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
            Submit
          </Button>
        </form>
      </Paper>

      <Dialog
        open={isPresentOpen}
        onClose={isPresentHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"This Visitor Already Exists"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Add new visiting record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExistingVisitor}>Yes</Button>
          <Button onClick={isPresentHandleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={recordAddedOpen}
        onClose={recordAddedHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Visitor Record Added"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You may close this window
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={recordAddedHandleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {doNavigate && (
        <Navigate to="/visitor-logbook" replace={true} />
      )}
    </Container>
  );
};
export default EnterVisitorDetailsMain;