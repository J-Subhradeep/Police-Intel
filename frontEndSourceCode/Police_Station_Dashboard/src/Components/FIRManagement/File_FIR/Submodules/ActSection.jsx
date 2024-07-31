import React from "react";
import { TextField, Typography, Grid,  CircularProgress, Paper, Box, Chip } from "@mui/material";
import { GradientButton2 } from "../Utilities/Utilities";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GavelIcon from '@mui/icons-material/Gavel';

const ActSection = ({ setActSection, handleIPCSectionChange, actSection, handleGenerateActSuggestion, actSectionProgress, AIIPCSections, showAIActSection }) => {
    return (
        <Grid item xs={12}>
            <div style={{ position: 'relative' }}>
                <TextField
                    fullWidth
                    label="Act Section"
                    variant="outlined"
                    multiline
                    rows={2}
                    value={actSection}
                    onChange={(e) => setActSection(e.target.value)}
                    InputProps={{
                        startAdornment: <GavelIcon />,
                    }}
                />
                <GradientButton2 variant="contained" size="small" onClick={handleGenerateActSuggestion}>
                    {actSectionProgress ? (
                        <>
                            <CircularProgress size={20} color="inherit" /> Loading...
                        </>
                    ) : (
                        <>
                            <AutoAwesomeIcon /> AI Suggestion
                        </>
                    )}
                </GradientButton2>
            </div>

            <div>
                {showAIActSection && (
                    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginBottom: '20px' }}>
                        <Typography variant="body1">AI Generated Suggestion</Typography>
                        <Typography variant="body2">Click to add</Typography>
                        {actSectionProgress && <CircularProgress />}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {AIIPCSections.map((section, index) => (
                                <Chip
                                    color="primary"
                                    key={section}
                                    label={section}
                                    sx={{ margin: '5px' }}
                                    clickable
                                    onClick={handleIPCSectionChange(section)}
                                />
                            ))}
                        </Box>
                    </Paper>
                )}
            </div>
        </Grid>
    );
};

export default ActSection;
