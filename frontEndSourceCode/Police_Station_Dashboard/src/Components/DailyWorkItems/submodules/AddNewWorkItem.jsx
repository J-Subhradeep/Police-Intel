import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, IconButton, Grid, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Stack } from '@mui/material';
import police from '../../../assets/police.webp'
import { getOfficers,addWorkFunc } from '../Utilities/Queries';
import AddWorkForm from './AddWorkForm';
import OfficerList from './OfficerList';
import TipsDialog from '../../Common/TipsDialog/TipsDialog';

const AddNewWorkItem = ({setPageStep}) => {
    const [workTitle, setWorkTitle] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [openDialog3, setOpenDialog3] = useState(false);
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
        if (workTitle.trim() !== '' && description.trim() !== '') {
            setStep(2);
        }
    };

    const handlePrevious = () => {
        setStep(1);
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
        const workData = {
            title: workTitle,
            description: description,
            submittedById: localStorage.getItem("userId"),
            doneId: selectedProfile.id,
            policeStationId: localStorage.getItem("PsId")
        }
        addWorkFunc(workData, setOpenDialog2, setOpenDialog3, setWorkTitle, setDescription);
    }

    const tipDialogClose = () => {
        setPageStep(1);
        setOpenDialog3(false);
        setActiveButton("WorkList")
    }

    return (
        <>
            {step === 1 && (
                <AddWorkForm description={description} handleFileChange={handleFileChange} files={files} handleNext={handleNext} handleUpload={handleUpload} openDialog={openDialog} setDescription={setDescription} setFiles={setFiles} setOpenDialog={setOpenDialog} setWorkTitle={setWorkTitle} workTitle={workTitle} />
            )}

            {step === 2 && (
                <OfficerList handleFileChange={handleFileChange} handlePrevious={handlePrevious} handleProfileSelect={handleProfileSelect} hoveredProfile={hoveredProfile} officers={officers} police={police} searchTerm={searchTerm} setHoveredProfile={setHoveredProfile} setSearchTerm={setSearchTerm} />
            )}
            <Dialog open={openDialog2} onClose={() => setOpenDialog2(false)}>
                <DialogTitle>Add Work Item</DialogTitle>
                <DialogContent>
                    <Typography>This work was done by {selectedProfile && selectedProfile.name}, {selectedProfile && selectedProfile.designation}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog2(false)}>Cancel</Button>
                    <Button onClick={() => handleAssignment()}>OK</Button>
                </DialogActions>
            </Dialog>
            <TipsDialog message={'The newly added Work Item will be visible in the "Daily Work Item" section of "Police Station Portal" and in "Work Done by Subordinates" section of "SP Portal" shortly'} tipDialogClose={tipDialogClose} tipDialogOpen={openDialog3} />
        
        </>
    );
};

export default AddNewWorkItem;
