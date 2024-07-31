import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const OfficerList = ({ setStep, searchTerm, setSearchTerm, officers, setHoveredProfile, handleProfileSelect, hoveredProfile, police }) => {
    return (
        <Stack spacing={0} style={{ width: '100%', display: 'flex', justifyContent: 'center', height: "calc(100vh - 4.3rem)", overflowY: "hidden", overflowX: "hidden", }}>
            <div style={{ width: '100%', height: '40%', }}>
                <IconButton onClick={() => setStep(1)} style={{ marginTop: '20px', marginLeft: '20px' }}>
                    <ArrowBackIcon />
                </IconButton>
                <div style={{ width: "100%", display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <Typography variant='h5'>Assign to</Typography>
                </div>
                <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        label="Search names..."
                        placeholder="Search names..."
                        variant="outlined"
                        // fullWidth
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        style={{ marginBottom: '10px', width: "30%" }}
                    />
                </div>
            </div>

            <Paper style={{ width: '55%', margin: 'auto', padding: '10px 20px 20px 20px', height: "60%" }}>
                <List sx={{ height: "100%", overflowY: 'scroll', overflowX: 'hidden' }}>
                    {officers
                        .filter(profile => profile.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(profile => (
                            <ListItem
                                key={profile.id}
                                onMouseEnter={() => setHoveredProfile(profile.id)}
                                onMouseLeave={() => setHoveredProfile(null)}
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
    )
}

export default OfficerList
