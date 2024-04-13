import React, { useState } from 'react';
import {
    TextField,
    Button,
    Alert,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Paper,
} from '@mui/material';
import { Box } from '@mui/joy';
import axios from 'axios';


const Registration = ({ onToggle, registerSuccess }) => {
    const [registrationData, setRegistrationData] = useState({
        name: '',
        emailOrPhone: '',
        password: '',
        confirmPassword: '',
        address: '',
    });
    const [alertMessage, setAlertMessage] = useState('');

    function isEmail(input) {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input);
    }

    function isPhoneNumber(input) {
        // Regular expression for phone number validation
        const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number, you may need to adjust this based on your requirements
        return phoneRegex.test(input);
    }


    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        // console.log(isEmail("abc@email.com"))
        if (
            !registrationData.name ||
            !registrationData.emailOrPhone ||
            !registrationData.password ||
            !registrationData.confirmPassword ||
            !registrationData.address
        ) {
            setAlertMessage('Please enter all fields.');
        }
        else if (registrationData.password != registrationData.confirmPassword) {
            setAlertMessage('Password and confirm password must match.');
        }
        else if (!isEmail(registrationData.emailOrPhone) && !isPhoneNumber(registrationData.emailOrPhone)) {
            setAlertMessage('Enter Valid Email.');
        }
        else if (registrationData.password !== registrationData.confirmPassword) {
            setAlertMessage('Passwords do not match.');
        } else {

            const registreData = {
                "role": "social-media-user",
                "name": registrationData.name,
                "userName": registrationData.emailOrPhone,
                "userPassword": registrationData.password,
                "userAddress": registrationData.address,
                "profilePhoto": "",
                "isMobileUser": isPhoneNumber(registrationData.emailOrPhone),
                "isEmailUser": isEmail(registrationData.emailOrPhone)
            }

            setLoading(true);
            doRegister(registreData)
        }
    };

    function doRegister(data) {
        console.log("register...")
    }

    return (
        <Paper elevation={3} style={{ width: '100%', padding: 20 }}>
            <ToggleButtonGroup
                value="registration"
                exclusive
                onChange={() => { }}
                style={{ width: '100%', marginBottom: 20, display: 'flex', justifyContent: 'center' }}
            >
                <ToggleButton value="login" sx={{ width: '50%', fontWeight: 'bold' }} onClick={() => onToggle('login')}>
                    Login
                </ToggleButton>
                <ToggleButton value="registration" disabled sx={{ width: '50%', fontWeight: 'bold' }} color='primary'>
                    Registration
                </ToggleButton>
            </ToggleButtonGroup>

            <TextField
                label="Name"
                fullWidth
                size='small'
                sx={{ marginBottom: '20px' }}
                onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
            />
            <TextField
                label="Email or phone number"
                fullWidth
                size='small'
                sx={{ marginBottom: '20px' }}
                onChange={(e) => setRegistrationData({ ...registrationData, emailOrPhone: e.target.value })}
            />
            <TextField
                type="password"
                label="Password"
                fullWidth
                size='small'
                sx={{ marginBottom: '20px' }}
                onChange={(e) => setRegistrationData({ ...registrationData, password: e.target.value })}
            />
            <TextField
                type="password"
                label="Confirm password"
                fullWidth
                size='small'
                sx={{ marginBottom: '20px' }}
                onChange={(e) => setRegistrationData({ ...registrationData, confirmPassword: e.target.value })}
            />
            <TextField
                label="Address"
                fullWidth
                size='small'
                sx={{ marginBottom: '20px' }}
                onChange={(e) => setRegistrationData({ ...registrationData, address: e.target.value })}
            />
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? 'Please wait...' : 'Register'}
                </Button>
                {/* <Button size='medium' variant="contained" color="primary" onClick={handleRegister}>
                    Register
                </Button> */}
            </Box>
            {alertMessage && (
                <Alert severity="error" style={{ marginTop: 20 }}>
                    {alertMessage}
                </Alert>
            )}
        </Paper>
    );
};

export default Registration