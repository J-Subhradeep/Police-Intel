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
import Registration from './Register';

const AuthMain = () => {
    // const [selectedForm, setSelectedForm] = useState('login');

    // const handleToggle = (form) => {
    //     setSelectedForm(form);
    // };

    const [alertMessage, setAlertMessage] = useState(false)

    // const registerSuccess = () => {
    //     setAlertMessage(true)
    // }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        {/* Add your menu icon */}
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Police Station Login
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ width: '30%', marginTop: 30, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {alertMessage? (
                <Alert severity="success" style={{ marginTop: 20, marginBottom: '20px' }}>
                    Registration successful
                </Alert>
            ) : <></>}
                <Login />
            </Container>
        </>
    );
};

export default AuthMain;
