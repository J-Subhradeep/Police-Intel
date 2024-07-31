import React from "react";
import { TextField, Typography, Grid, Autocomplete, CircularProgress } from "@mui/material";
import { GradientButton } from "../Utilities/Utilities";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const CrimeCatagory = ({categories, crimeCategories, handleCrimeCategoryChange, handleAISuggestion, AICatagoryLoading}) => {
    return (
        <Grid>
        <Typography sx={{ mt: '15px' }} variant="h6" gutterBottom>
          Crime Category
        </Typography>
        <Autocomplete
          sx={{ width: "70%" }}
          multiple
          id="tags-outlined"
          options={categories}
          filterSelectedOptions
          getOptionLabel={(option) => option}
          onChange={handleCrimeCategoryChange}
          value={crimeCategories}
          renderInput={(params) => (
            <TextField {...params} label="Crime Categories" />
          )}
        />
        {/* Show selected crime categories as chips */}
        <GradientButton variant="contained" size="small" onClick={handleAISuggestion}>
          {AICatagoryLoading ? (
            <>
              <CircularProgress size={20} color="inherit" /> Loading...
            </>
          ) : (
            <>
              <AutoAwesomeIcon /> AI Suggestion
            </>
          )}
        </GradientButton>
      </Grid>
    );
};

export default CrimeCatagory;
