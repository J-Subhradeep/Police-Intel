import React from "react";
import { TextField, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BadgeIcon from "@mui/icons-material/Badge";

const IODetails = ({setOfficerDesig, setPoliceOfficerName, officerID, handleOfficerIdChange, policeOfficerName, officerDesig}) => {
    return (
        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    label=" ID"
                    variant="outlined"
                    value={officerID}
                    onChange={handleOfficerIdChange}
                    InputProps={{
                        startAdornment: <BadgeIcon />,
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    label=" Name"
                    variant="outlined"
                    value={policeOfficerName}
                    onChange={(e) => setPoliceOfficerName(e.target.value)}
                    disabled={true}
                    InputProps={{
                        startAdornment: <AccountCircleIcon />,
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    label=" Designation"
                    variant="outlined"
                    value={officerDesig}
                    onChange={(e) => setOfficerDesig(e.target.value)}
                    disabled={true}
                    InputProps={{
                        startAdornment: <AssignmentIcon />,
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default IODetails;
