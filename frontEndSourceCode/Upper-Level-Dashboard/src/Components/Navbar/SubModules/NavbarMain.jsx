import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import Grid from '@mui/material/Unstable_Grid2';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RightDrawerMenu from './RightDrawerMenu';
import HomeIcon from '@mui/icons-material/Home';
import { color } from '../../../GlobalConfig/config';


import { NavbarMainWrapper } from '../Styles/NavbarMainWrapper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavbarMain = () => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/dashboard');
  };

  return (
    <NavbarMainWrapper>
      <AppBar position="static" sx={{ bgcolor: color.green1, height: { xs: '4.3rem', }, }} >
        <Container maxWidth="xl">
          <Grid container>
            <Grid xs={5} sx={{ flexGrow: 1, display: { xs: 'flex', }, alignItems: 'center', textAlign: 'center' }}>
              <LocalPoliceIcon sx={{ display: { xs: 'flex', }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'sans-serif',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Karnataka Police
              </Typography>
              <span style={{fontSize: '0.8rem', fontFamily: 'sans-serif'}}>{localStorage.getItem("name")}, {localStorage.getItem("role")}</span>

            </Grid>

            <Grid xs={3} sx={{ flexGrow: 1, display: { xs: 'flex' }, justifyContent: 'flex-end' }} >

              <IconButton
                key='dashboard'
                sx={{ mx: 1, my: 1.5, color: 'white', display: { md: 'block', xs: 'none' } }}
                onClick={handleNavigate}
              >
                <HomeIcon />
              </IconButton>
              <IconButton
                key='notification'
                sx={{ mx: 1, my: 1.5, color: 'white', display: { md: 'block', xs: 'none' } }}
              >
                <HelpOutlineIcon />
              </IconButton>

              <RightDrawerMenu />
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </NavbarMainWrapper>
  );
}

export default NavbarMain;