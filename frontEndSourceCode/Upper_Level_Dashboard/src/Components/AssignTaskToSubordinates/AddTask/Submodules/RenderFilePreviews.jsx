import React from "react";
import { Typography, Grid, Paper, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { handleRemoveFile } from "../Utilities/Functions";

export const renderFilePreviews = (files, setFiles) => {

    return files.map((file, index) => (
      <Grid item key={index}>
        <Paper elevation={3} style={{ padding: 10, display: 'flex', alignItems: 'center' }}>
          <Typography>{file.name}</Typography>
          <IconButton onClick={() => handleRemoveFile(index, setFiles)}>
            <CloseIcon />
          </IconButton>
          <img src={URL.createObjectURL(file)} alt={file.name} style={{ marginLeft: 10, maxWidth: 100, maxHeight: 100 }} />
        </Paper>
      </Grid>
    ));
  };