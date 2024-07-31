import React from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField, Button, Grid, MenuItem, FormControl, Select } from "@mui/material";

const VictimdDetails = ({ handleAddVictim, handleVictimChange, victims, handleDeleteVictim }) => {
    return (
        <>
            {victims.map((vic, index) => (
                <Grid container spacing={2} key={index}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            value={vic.victimName}
                            onChange={(e) => handleVictimChange(index, 'victimName', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <Select
                                value={vic.victimGender}
                                onChange={(e) => handleVictimChange(index, 'victimGender', e.target.value)}
                                displayEmpty
                                defaultValue=""
                                inputProps={{ "aria-label": "Without label" }}
                            >
                                <MenuItem value="" disabled>
                                    Gender
                                </MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Age"
                            variant="outlined"
                            type="number"
                            value={vic.victimAge}
                            onChange={(e) => handleVictimChange(index, 'victimAge', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <Select
                                value={vic.victimSocialCategory}
                                onChange={(e) => handleVictimChange(index, 'victimSocialCategory', e.target.value)}
                                displayEmpty
                                defaultValue=""
                                inputProps={{ "aria-label": "Without label" }}
                            >
                                <MenuItem value="" disabled>
                                    Social Category
                                </MenuItem>
                                <MenuItem value="Upper Class">Upper Class</MenuItem>
                                <MenuItem value="Middle Class">Middle Class</MenuItem>
                                <MenuItem value="Lower Class">Lower Class</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <Select
                                value={vic.victimJob}
                                onChange={(e) => handleVictimChange(index, 'victimJob', e.target.value)}
                                displayEmpty
                                defaultValue=""
                                inputProps={{ "aria-label": "Without label" }}
                            >
                                <MenuItem value="" disabled>
                                    Job
                                </MenuItem>
                                <MenuItem value="Unemployed">Unemployed</MenuItem>
                                <MenuItem value="Government Job">Government Job</MenuItem>
                                <MenuItem value="Private Service">Private Service</MenuItem>
                                <MenuItem value="Student">Student</MenuItem>
                                <MenuItem value="Business">Business</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            startIcon={<DeleteIcon />}
                            color="error"
                            onClick={() => handleDeleteVictim(index)}
                        >
                            Delete Victim
                        </Button>
                    </Grid>
                </Grid>
            ))}
            <Button
                startIcon={<AddIcon />}
                onClick={handleAddVictim}
            >
                Add Another Victim
            </Button>
        </>

    );
};

export default VictimdDetails;
