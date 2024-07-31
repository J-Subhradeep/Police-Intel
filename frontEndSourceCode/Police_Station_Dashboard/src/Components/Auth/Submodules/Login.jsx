import React, { useState } from 'react';
import {
    TextField,
    Button,
    Alert,
    MenuItem,
    Paper,
} from '@mui/material';
import { Box } from '@mui/joy';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { baseUrls } from '../../../GlobalConfig/config';
import { getOfficerData } from '../Utility/Utils';


const Login = () => {
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({ userName: '', password: '', role: '' });
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    const roles = ["PI", "PSI"]; // Array for menu items

    const handleLogin = () => {
        if (!loginData.userName || !loginData.password || !loginData.role) {
            setAlertMessage('Please enter all fields.');
        } else {
            setLoading(true);
            doLogin();
        }
    };


    async function doLogin() {

        await axios
            .post(`${baseUrls.backEndUrl}/manage/officer/auth/login`, loginData)
            .then((res) => {
                console.log(res);
                setAlertMessage('Login successful!');
                localStorage.setItem('token', res.data.token);
                getOfficerData(res.data.userId);
                console.log(res.data.userId)
                setLoading(false);
                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
                setAlertMessage('Something went wrong!');
                setLoading(false);
            });
    }

    return (
        <Paper elevation={3} style={{ width: '100%', padding: 20 }}>
            <TextField
                size='small'
                sx={{ marginBottom: '20px' }}
                select
                label="Role"
                fullWidth
                value={loginData.role}
                onChange={(e) => setLoginData({ ...loginData, role: e.target.value })}
            >
                {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                        {role}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                size='small'
                sx={{ marginBottom: '20px' }}
                label="User Name"
                fullWidth
                margin="normal"
                onChange={(e) => setLoginData({ ...loginData, userName: e.target.value })}
            />
            <TextField
                size='small'
                sx={{ marginBottom: '20px' }}
                type="password"
                label="Password"
                fullWidth
                margin="normal"
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? 'Please wait...' : 'Login'}
                </Button>
            </Box>
            {alertMessage && (
                <Alert severity="error" style={{ marginTop: 20 }}>
                    {alertMessage}
                </Alert>
            )}

        </Paper>
    );
};

export default Login;
