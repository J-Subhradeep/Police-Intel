import React from "react";
import { TextField, Typography, Grid, FormControl, Select, MenuItem, } from "@mui/material";

const OccuranceOfOffence = ({ setComplainantPhone, setComplainantName, setPlace, setFirType, setDateTimeTo, setDateTimeFrom, dateTimeFrom, dateTimeTo, firType, place, complainantName, complainantPhone }) => {
    return (
        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
            <Grid item xs={12} sm={6}>
                <Typography variant="p" sx={{ fontSize: "12px" }}>From</Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    type="datetime-local"
                    value={dateTimeFrom}
                    onChange={(e) =>  setDateTimeFrom(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="p" sx={{ fontSize: "12px" }}>To</Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    type="datetime-local"
                    value={dateTimeTo}
                    onChange={(e) => setDateTimeTo(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Select
                        value={firType}
                        onChange={(e)=> setFirType(e.target.value)}
                        displayEmpty
                        defaultValue=""
                        inputProps={{ "aria-label": "Without label" }}
                    >
                        <MenuItem value="" disabled>
                            FIR Type
                        </MenuItem>
                        <MenuItem value="Heinous">Heinous</MenuItem>
                        <MenuItem value="Non-Heinous">Non-Heinous</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Place Of Incident"
                    variant="outlined"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Complainant Name"
                    variant="outlined"
                    value={complainantName}
                    onChange={(e) => setComplainantName(e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Complainant Phone Number"
                    variant="outlined"
                    value={complainantPhone}
                    onChange={(e) => setComplainantPhone(e.target.value)}
                />
            </Grid>
        </Grid>
    );
};

export default OccuranceOfOffence;
