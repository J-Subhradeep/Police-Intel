import React from "react";
import { Backdrop, CircularProgress, DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { Link } from "react-router-dom";

const DialogComponent = ({ backdropOpen, dialogOpen, addFirDialogClose }) => {
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdropOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Dialog
                open={dialogOpen}
                onClose={addFirDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    FIR Saved
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You can close the alert
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link
                        to={"/fir"}
                        style={{ textDecoration: 'none', color: 'inherit', }}
                    >
                        <Button onClick={addFirDialogClose}>Ok</Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DialogComponent;
