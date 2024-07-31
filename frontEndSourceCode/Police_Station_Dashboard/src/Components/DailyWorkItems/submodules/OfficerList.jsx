import React from "react";
import { TextField, Stack, Paper, IconButton, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const OfficerList = ({ handlePrevious, searchTerm, officers, handleProfileSelect, setHoveredProfile, hoveredProfile, police, setSearchTerm }) => {
    return (
        <Stack spacing={0} style={{ width: '100%', display: 'flex', justifyContent: 'center', overflowY: "hidden", overflowX: "hidden", }}>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={handlePrevious} style={{ marginRight: '20px' }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant='h5'>Done by</Typography>
            </div>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
                <TextField label="Search names..." placeholder="Search names..." variant="outlined" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} style={{ width: "30%" }}
                />
            </div>
            <Paper style={{ width: '55%', margin: 'auto', padding: '10px 20px 20px 20px', height: "60%" }}>
                <List sx={{ height: "100%", overflowY: 'scroll', overflowX: 'hidden' }}>
                    {officers
                        .filter(profile => profile.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(profile => (
                            <ListItem key={profile.id} onMouseEnter={() => setHoveredProfile(profile.id)} onMouseLeave={() => setHoveredProfile(null)}
                                onClick={() => handleProfileSelect(profile)}
                                style={{ backgroundColor: hoveredProfile === profile.id ? '#f0f0f0' : 'transparent', cursor: 'pointer' }}
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
    );
};

export default OfficerList;
