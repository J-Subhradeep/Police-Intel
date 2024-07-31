import React from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField, Button, Grid, MenuItem, FormControl, Select } from "@mui/material";

const AccusedDetails = ({ accused, handleAccusedChange, handleAddAccused, handleDeleteAccused }) => {
    return (
        <>
            {accused.map((acc, index) => (
                <Grid container spacing={2} key={index}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            value={acc.accusedName}
                            onChange={(e) => handleAccusedChange(index, 'accusedName', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <Select
                                defaultValue=""
                                value={acc.accusedGender}
                                onChange={(e) => handleAccusedChange(index, 'accusedGender', e.target.value)}
                                displayEmpty

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
                            value={acc.accusedAge}
                            onChange={(e) => handleAccusedChange(index, 'accusedAge', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <Select
                                value={acc.accusedSocialCategory}
                                onChange={(e) => handleAccusedChange(index, 'accusedSocialCategory', e.target.value)}
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
                                value={acc.accusedJob}
                                onChange={(e) => handleAccusedChange(index, 'accusedJob', e.target.value)}
                                displayEmpty
                                defaultValue=""
                                inputProps={{ "aria-label": "Without label" }}
                            >
                                <MenuItem value="" disabled>
                                    Job
                                </MenuItem>
                                <MenuItem value="Unemployed">Unemployed</MenuItem>
                                <MenuItem value="Student">Student</MenuItem>
                                <MenuItem value="Retired Person">Retired Person</MenuItem>
                                <MenuItem value="Government Job">Government Job</MenuItem>
                                <MenuItem value="Private Service">Private Service</MenuItem>
                                <MenuItem value="Business">Business</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            startIcon={<DeleteIcon />}
                            color="error"
                            onClick={() => handleDeleteAccused(index)}
                        >
                            Delete Accused
                        </Button>
                    </Grid>
                </Grid>
            ))}
            <Button
                startIcon={<AddIcon />}
                onClick={handleAddAccused}
            >
                Add Another Accused
            </Button>
        </>

    );
};

export default AccusedDetails;
