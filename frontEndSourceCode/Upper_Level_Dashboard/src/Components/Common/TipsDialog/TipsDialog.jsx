import React from "react";
import { DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const TipsDialog = ({ tipDialogOpen, tipDialogClose, message }) => {
    return (
        <>
            <Dialog
                open={tipDialogOpen}
                onClose={tipDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    💡 Tips
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{color: "black"}} id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={tipDialogClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TipsDialog;
