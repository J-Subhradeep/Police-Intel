import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"


const DialogBoxVisitorDetails = ({dialouge,handleCloseDialouge,visitorName, visitorEmail, visitorPhone, visitorAddress, visitingTime}) => {
  return (
    <div>

    <Dialog open={dialouge} onClose={handleCloseDialouge}>
      <DialogTitle>Visitor Information</DialogTitle>
      <DialogContent>
        <Typography variant='h6'>Visitor Name: {visitorName}</Typography>
        <Typography variant='h6'>Visitor Email: {visitorEmail}</Typography>
        <Typography variant='h6'>Visitor Phone: {visitorPhone}</Typography>
        <Typography variant='h6'>Visitor Address: {visitorAddress}</Typography>
        <Typography variant='h6'>Visiting Time: {visitingTime}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleCloseDialouge}>Close</Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}

export default DialogBoxVisitorDetails