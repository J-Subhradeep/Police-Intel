import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, IconButton, Paper, CircularProgress } from '@mui/material';
import { AttachFile, Close } from '@mui/icons-material';

const NewUpdate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = title.trim() !== '' && description.trim() !== '';

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setFilePreviews(previews);
  };

  const handleFileRemove = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    const updatedPreviews = [...filePreviews];
    updatedPreviews.splice(index, 1);
    setFilePreviews(updatedPreviews);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate a submit action (e.g., an API call)
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form fields after submission
      setTitle('');
      setDescription('');
      setSelectedFiles([]);
      setFilePreviews([]);
    }, 2000);
  };

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center', margin: '20px 0px 20px 0px' }}>
        New Update
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Paper elevation={3} style={{ padding: 20, width: '60%', marginBottom: '20px' }}>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  id="file-upload"
                  type="file"
                  style={{ display: 'none' }}
                  multiple
                  onChange={handleFileSelect}
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<AttachFile />}
                  >
                    Add Files
                  </Button>
                </label>
                {filePreviews.length > 0 && (
                  <div>
                    <Typography variant="h6" gutterBottom>
                      Selected Files:
                    </Typography>
                    {filePreviews.map((preview, index) => (
                      <div key={index}>
                        <img src={preview} alt="File Preview" style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }} />
                        <IconButton
                          color="secondary"
                          aria-label="remove file"
                          onClick={() => handleFileRemove(index)}
                        >
                          <Close />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                )}
              </Grid>
              <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default NewUpdate;
