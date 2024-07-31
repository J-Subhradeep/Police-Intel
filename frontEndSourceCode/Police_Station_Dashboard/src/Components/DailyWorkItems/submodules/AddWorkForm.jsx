import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { TextField, Button, Grid, Stack, Paper, Dialog, DialogTitle, DialogContent, Typography, DialogActions} from "@mui/material";
import { renderFilePreviews } from "./RenderFilePreviews";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AddWorkForm = ({ setWorkTitle, workTitle, description, setDescription, openDialog, setOpenDialog, files, setFiles, handleNext, handleFileChange, handleUpload}) => {
    return (
        <Stack style={{ width: '100%', display: 'flex', justifyContent: 'center', }}>
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
                        <Typography variant='h5'>New Work Item</Typography>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', }}>
                        <Paper style={{ width: '55%', margin: 'auto', padding: '20px', marginTop: '0px' }}>
                            <TextField label="Work Title" fullWidth value={workTitle} onChange={(e) => setWorkTitle(e.target.value)} style={{ marginBottom: 20 }}
                            />
                            <TextField label="Description" fullWidth multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} style={{ marginBottom: 20 }}
                            />
                            <div style={{ marginBottom: 20 }}>
                                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)} style={{ marginBottom: 10 }}
                                >
                                    Add Files
                                </Button>
                                <Grid container spacing={1}>
                                    {renderFilePreviews(files, setFiles)}
                                </Grid>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', marginBottom: '20px' }}>
                                <Button onClick={handleNext} variant="contained" color="primary" disabled={workTitle.trim() === '' || description.trim() === ''}
                                >
                                    Next <ArrowForwardIcon />
                                </Button>
                            </div>
                        </Paper>
                    </div>

                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                        <DialogTitle>Upload File</DialogTitle>
                        <DialogContent>
                            <input type="file" onChange={handleFileChange} style={{ marginBottom: 10 }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleUpload}>Upload</Button>
                        </DialogActions>
                    </Dialog>
                </Stack>
    );
};

export default AddWorkForm;
