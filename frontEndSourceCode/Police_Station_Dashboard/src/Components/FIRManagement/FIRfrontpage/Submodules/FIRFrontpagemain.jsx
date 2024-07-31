import React from 'react'
import { Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Link } from "react-router-dom";


const StyledButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '120%',
  height: '120px',
  borderRadius: '10px',
  border: '2px solid #3f51b5',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#3f51b5',
    color: 'white',
    transform: 'scale(1.1)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
}));

const FIRFrontpagemain = () => {
  return (
    <div>

      <div style={{ height: 'calc(100vh - 4.3rem)' }}>
        <Typography sx={{ height: '4rem', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', ml: '10px' }} variant="h5">
          FIR Management
        </Typography>
        <div style={{ height: 'calc(100vh - 8.3rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
          <Grid container spacing={14} justifyContent="center">
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Link
                to={"fileFIR"}
                style={{ textDecoration: 'none', color: 'inherit', width: '50%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
              >
                  <StyledButton variant="contained" >
                    <PlaylistAddIcon fontSize="large" />
                    <div>File FIR</div>
                  </StyledButton>
              </Link>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Link
                to={"management"}
                style={{ textDecoration: 'none', color: 'inherit', width: '50%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
              >
                <StyledButton variant="contained">
                  <AssignmentIcon fontSize="large" />
                  <div>Manage FIR</div>
                </StyledButton>
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default FIRFrontpagemain