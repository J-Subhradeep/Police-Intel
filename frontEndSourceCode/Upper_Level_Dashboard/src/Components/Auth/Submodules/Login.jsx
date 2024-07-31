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
import { baseUrls, color, elasticSearchPassword, elasticSearchUserName } from '../../../GlobalConfig/config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({ userName: '', password: '', role: '' });
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    const roles = ["SP", "DSP"]; // Array for menu items

    const handleLogin = () => {
        if (!loginData.userName || !loginData.password || !loginData.role) {
            setAlertMessage('Please enter all fields.');
        } else {
            setLoading(true);
            doLogin();
        }
    };

    async function getAdminData(officerId) {
        try {
            const PSData = await axios({
                method: 'post', 
                url: `${baseUrls.elasticSearchUrl}/officer_repository/_search`,
                headers: {
                    Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
                    'Content-Type': 'application/json',
                },
                data: {
                    "query": {
                        "match": {
                            "id": officerId
                        }
                    }
                }

            });
            localStorage.setItem('name', PSData.data.hits.hits[0]._source.name);
            localStorage.setItem('userId', PSData.data.hits.hits[0]._source.id);
            localStorage.setItem('role', PSData.data.hits.hits[0]._source.role);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    function doLogin() {

        axios
            .post(`${baseUrls.backEndUrl}/manage/officer/auth/login`, loginData)
            .then((res) => {
                setAlertMessage('Login successful!');
                navigate(`/home`);
                localStorage.setItem('token', res.data.token);
                getAdminData(res.data.userId);
                setLoading(false);
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
                {roles.map((role) => ( // Map over roles array to create menu items
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
                    onClick={handleLogin}
                    disabled={loading}
                    sx={{
                    bgcolor: color.green1,
                    '&:hover': {
                        bgcolor: color.green2, // Change to the desired hover color
                    },
                }}
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
