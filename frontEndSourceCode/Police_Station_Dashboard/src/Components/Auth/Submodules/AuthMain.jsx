import React, { useState } from 'react';
import {
    Typography,
    Container,
    AppBar,
    Toolbar,
    IconButton,
    Alert,
} from '@mui/material';
import Login from './Login';

const AuthMain = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Police Station Login
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ width: '30%', marginTop: 30, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Login />
            </Container>
        </>
    );
};

export default AuthMain;
