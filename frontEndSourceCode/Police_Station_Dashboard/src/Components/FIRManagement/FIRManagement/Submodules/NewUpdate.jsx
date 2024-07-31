import React, { useRef, useState } from 'react';
import { TextField, Button, Typography, Grid, IconButton, Paper, CircularProgress } from '@mui/material';
import { AttachFile, Close } from '@mui/icons-material';
import { postUpdate } from '../Utilities/Queries';

const NewUpdate = ({FIRId}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState({
    name: '',
  });
  const hiddenFileInputRef = useRef(null);

  const isFormValid = title.trim() !== '' && description.trim() !== '';

  const handleFileSelect = (event) => {
    const fileUploaded = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (fileUploaded) {
      reader.readAsDataURL(fileUploaded);
    }

    setFile(fileUploaded);
  };

  const handleFile = () => {
    hiddenFileInputRef.current.click();
  };

  const handleFileRemove = (index) => {
    hiddenFileInputRef.current.value = '';
    setFile({ name: '' });
    setImagePreview(null);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('FIR_id', FIRId);
    formData.append('title', title);
    formData.append('description', description);
    if (file.name.length > 0) {
      formData.append('files', file);
    }
    postUpdate(formData, setIsSubmitting);
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
                  ref={hiddenFileInputRef}
                />
                <Button
                  onClick={handleFile}
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<AttachFile />}
                >
                  Add Files
                </Button>
                {imagePreview && (
                  <div>
                    <Typography variant="h6" gutterBottom>
                      Selected Files:
                    </Typography>
                    <div>
                      <img src={imagePreview} alt="File Preview" style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }} />
                      <IconButton
                        color="secondary"
                        aria-label="remove file"
                        onClick={() => handleFileRemove()}
                      >
                        <Close />
                      </IconButton>
                    </div>
                  </div>
                )}
              </Grid>
              <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} item xs={12}>
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
