import React from "react";
import { DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const ComingSoonDialog = ({ comingSoonDialogOpen, comingSoonDialogClose, message }) => {
    return (
        <>
            <Dialog
                open={comingSoonDialogOpen}
                onClose={comingSoonDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                🔜 Coming Soon
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{color: "black"}} id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={comingSoonDialogClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ComingSoonDialog;
