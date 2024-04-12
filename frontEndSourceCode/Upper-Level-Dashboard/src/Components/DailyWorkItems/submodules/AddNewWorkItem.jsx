import React, { useState } from 'react';
import { Paper, TextField, Button, Dialog, DialogTitle, DialogActions, DialogContent, IconButton, Grid, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import police from '../../../assets/police.webp'
import { useNavigate } from 'react-router-dom';
import { elasticSearchPassword, elasticSearchUserName } from '../../../GlobalConfig/config';

const profiles = [
    { id: 1, name: 'John Doe', designation: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', designation: 'UI/UX Designer' },
    { id: 4, name: 'Mike Johnson', designation: 'Product Manager' },
    { id: 5, name: 'Mike Johnson', designation: 'Product Manager' },
    { id: 6, name: 'Mike Johnson', designation: 'Product Manager' },
    { id: 7, name: 'Mike Johnson', designation: 'Product Manager' },
    { id: 8, name: 'Mike Johnson', designation: 'Product Manager' },
    { id: 9, name: 'Mike Johnson', designation: 'Product Manager' },
    { id: 10, name: 'Mike Johnson', designation: 'Product Manager' },
    { id: 11, name: 'Mike Johnson', designation: 'Product Manager' },
];

const AddNewWorkItem = () => {
    const [workTitle, setWorkTitle] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [openDialog3, setOpenDialog3] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [step, setStep] = useState(1); // 1: AddTaskMain, 2: AddTaskMain2
    const [selectedProfile, setSelectedProfile] = useState(null); // Selected profile state

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

    const handleRemoveFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    const renderFilePreviews = () => {
        return files.map((file, index) => (
            <Grid item key={index}>
                <Paper elevation={3} style={{ padding: 10, display: 'flex', alignItems: 'center' }}>
                    <Typography>{file.name}</Typography>
                    <IconButton onClick={() => handleRemoveFile(index)}>
                        <CloseIcon />
                    </IconButton>
                    <img src={URL.createObjectURL(file)} alt={file.name} style={{ marginLeft: 10, maxWidth: 100, maxHeight: 100 }} />
                </Paper>
            </Grid>
        ));
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleProfileHover = (profileId) => {
        setHoveredProfile(profileId);
    };

    const clearHoveredProfile = () => {
        setHoveredProfile(null);
    };

    const handleNext = () => {
        if (workTitle.trim() !== '' && description.trim() !== '') {
            setStep(2);
        }
    };

    const handlePrevious = () => {
        setStep(1);
    };

    // Function to handle profile selection
    const handleProfileSelect = (profile) => {
        setSelectedProfile(profile);
        setOpenDialog2(true);
    };

    React.useEffect(() => {
        getOfficers();
      }, [])

    const [officers, setofficers] = useState([]);

    async function getOfficers() {

        // console.log(userId)
        try {
            const userResponse = await axios({
                method: 'post',  // Use 'post' method for sending data in the request body
                url: 'https://elasticsearchget.web-project.in/officer_repository/_search',
                headers: {
                    Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
                    'Content-Type': 'application/json',
                },
                data:
                {
                    "query": {
                        "match": {
                            "superior_id": localStorage.getItem("userId")
                        }
                    },
                    "sort": {
                        "id": {
                            "order": "asc"
                        }
                    }
                }
            });

            console.log(userResponse.data.hits.hits)

            const arr = []

            userResponse.data.hits.hits.forEach(element => {
                arr.push({ id: element._source.id, name: element._source.name, email: element._source.user_name.split("-")[1], designation: element._source.role, image: element._source.photo });
            });
            console.log(arr)
            setofficers(arr);


        } catch (error) {
            console.error('Error:', error);
        }
    }

    const navigate = useNavigate();

    function addWorkFunc(workData) {

        axios
            .post('https://api.web-project.in/task/manage/job/add-job', workData, {
                headers: {
                  Authorization:
                    `Bearer ${localStorage.getItem('token')}`,
                }
              })
            .then((res) => {
                console.log(res);
                // navigate("/workItems")
                setOpenDialog2(false)
                setOpenDialog3(true)
                // setStep(1)
                setWorkTitle('')
                setDescription('')
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleAssignment = () => {
        const workData = {
            title: workTitle,
            description: description,
            submittedById: localStorage.getItem("userId"),
            doneId: selectedProfile.id,
            policeStationId: localStorage.getItem("PsId")
        }
        addWorkFunc(workData);
    }

    const handleCloseAll = () => {
        setStep(1);
        setOpenDialog3(false);
    }

    return (
        <>
            {step === 1 && (
                <Stack style={{ width: '100%', display: 'flex', justifyContent: 'center', }}>
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
                        <Typography variant='h5'>New Work Item</Typography>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', }}>
                        <Paper style={{ width: '55%', margin: 'auto', padding: '20px', marginTop: '0px' }}>
                            <TextField
                                label="Work Title"
                                fullWidth
                                value={workTitle}
                                onChange={(e) => setWorkTitle(e.target.value)}
                                style={{ marginBottom: 20 }}
                            />
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ marginBottom: 20 }}
                            />
                            <div style={{ marginBottom: 20 }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={() => setOpenDialog(true)}
                                    style={{ marginBottom: 10 }}
                                >
                                    Add Files
                                </Button>
                                <Grid container spacing={1}>
                                    {renderFilePreviews()}
                                </Grid>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', marginBottom: '20px' }}>
                                <Button
                                    onClick={handleNext}
                                    variant="contained"
                                    color="primary"
                                    disabled={workTitle.trim() === '' || description.trim() === ''}
                                >
                                    Next <ArrowForwardIcon />
                                </Button>
                            </div>
                        </Paper>
                    </div>

                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                        <DialogTitle>Upload File</DialogTitle>
                        <DialogContent>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                style={{ marginBottom: 10 }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleUpload}>Upload</Button>
                        </DialogActions>
                    </Dialog>
                </Stack>
            )}

            {step === 2 && (
                <Stack spacing={0} style={{ width: '100%', display: 'flex', justifyContent: 'center', overflowY: "hidden", overflowX: "hidden", }}>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton onClick={handlePrevious} style={{ marginRight: '20px' }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant='h5'>Assign to</Typography>
                    </div>
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
                        <TextField
                            label="Search names..."
                            placeholder="Search names..."
                            variant="outlined"
                            // fullWidth
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{ width: "30%" }}
                        />
                    </div>
                    <Paper style={{ width: '55%', margin: 'auto', padding: '10px 20px 20px 20px', height: "60%" }}>
                        <List sx={{ height: "100%", overflowY: 'scroll', overflowX: 'hidden' }}>
                            {officers
                                .filter(profile => profile.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map(profile => (
                                    <ListItem
                                        key={profile.id}
                                        onMouseEnter={() => handleProfileHover(profile.id)}
                                        onMouseLeave={clearHoveredProfile}
                                        onClick={() => handleProfileSelect(profile)} // Call handleProfileSelect on profile click
                                        style={{ backgroundColor: hoveredProfile === profile.id ? '#f0f0f0' : 'transparent', cursor: 'pointer' }} // Add cursor pointer style
                                    >
                                        <ListItemAvatar>
                                            <Avatar alt={profile.name} src={police} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={profile.name}
                                            secondary={<span style={{ fontSize: '0.8rem' }}>{profile.designation}</span>}
                                        />
                                    </ListItem>
                                ))}
                        </List>
                    </Paper>
                </Stack>
            )}

            {/* Dialog box for profile assignment */}
            <Dialog open={openDialog2} onClose={() => setOpenDialog2(false)}>
                <DialogTitle>Assign Task</DialogTitle>
                <DialogContent>
                    <Typography>Assign the task to {selectedProfile && selectedProfile.name}, {selectedProfile && selectedProfile.designation}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog2(false)}>Cancel</Button>
                    <Button onClick={() => handleAssignment()}>OK</Button>
                </DialogActions>
            </Dialog>
           
            <Dialog open={openDialog3} onClose={() => setOpenDialog3(false)}>
                <DialogTitle>New Task Assigned</DialogTitle>
                <DialogContent>
                    <Typography>You can close this window</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseAll()}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddNewWorkItem;
