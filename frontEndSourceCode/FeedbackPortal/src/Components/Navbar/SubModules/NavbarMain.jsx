import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import Grid from '@mui/material/Unstable_Grid2';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { NavbarMainWrapper } from '../Styles/Navbar.styled';
import { Home } from '@mui/icons-material';
import { color } from '../../../GlobalConfig/config';

const NavbarMain = () => {

  const handleNavigate = () => {
    window.location.reload();
  };

  return (
    <NavbarMainWrapper>
      <AppBar position="static" sx={{ height: { xs: '4.3rem', }, bgcolor: color.color1 }} >
        <Grid container>
          <Grid xs={6} sx={{ paddingLeft: '10px', flexGrow: 1, display: { xs: 'flex', }, alignItems: 'center', textAlign: 'center' }}>
            <LocalPoliceIcon sx={{ display: { xs: 'flex', }, mr: 1 }} />
            <Typography
              // variant="h6"
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex' },
                fontFamily: 'sans-serif',
                fontWeight: { xs: 500, md: 700 },
                fontSize: { xs: '0.8rem', sm: '1.1rem', md: '1.4rem' },
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Karnataka Police Feedback Portal
            </Typography>

          </Grid>

          <Grid xs={2} md={6} sx={{ flexGrow: 1, display: { xs: 'flex' }, justifyContent: 'flex-end' }} >
            <IconButton
              onClick={handleNavigate}
              sx={{ mx: 1, my: 1.5, color: 'white', }}
            >
              <Home />
            </IconButton>
            <IconButton
              sx={{ mx: 1, my: 1.5, color: 'white', }}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      </AppBar>
    </NavbarMainWrapper>
  );
}

export default NavbarMain;