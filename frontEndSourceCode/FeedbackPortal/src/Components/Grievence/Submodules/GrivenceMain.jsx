import React, { useState } from 'react';
import {
    Paper,
    Select,
    MenuItem,
    InputLabel,
    InputBase,
    Slider,
    Typography,
    Box,
    Button,
    Container,
    TextField,
} from '@mui/material';
import axios from 'axios';
import { baseUrls } from '../../../GlobalConfig/config';


const GrivenceMain = (props) => {


    const [grievance, setGrivence] = useState("");
    const [address, setAddress] = useState("");

    const handleGrivence = (event) => {
        setGrivence(event.target.value);
    };

    const handleAddress = (event) => {
        setAddress(event.target.value);
    };


    const handleFormSubmit = () => {
        postReview();
        console.log(props.props.props)
    };

    async function postReview() {
        try {
            const submit = await axios({
                method: 'post',
                url: `${baseUrls.backEndUrl}/action/grievance/register`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    "complaint": grievance,
                    "address": address,
                    "mobile": props.props.props
                }

            });

            console.log(submit)

        } catch (error) {
            console.error('Error:', error);
        }
    }


    const paperStyle = {
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const inputStyle = {
        width: '100%',
        marginBottom: '16px',
        padding: '8px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        outline: 'none',
        '&:focus': {
            borderColor: '#1976D2',
        },
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'center',
                height: { md: 'calc(100vh - 4.3rem)', xs: '65vh' },
                overflowX: 'hidden',
                overflowY: 'scroll'
            }}
        >
            <Container component="main" maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem' }}>
                {/* Heading above the radio buttons */}
                <Typography variant="h5" sx={{ marginBottom: 4 }}>
                    Lodge your grievance
                </Typography>

            </Container>
            <Paper elevation={3} style={paperStyle} sx={{ width: { xs: '75%', md: '40%' } }}>
                <TextField onChange={(e) => { handleAddress(e) }} fullWidth id="outlined-basic" label="Your Address" variant="outlined" sx={{marginBottom: '15px'}}/>
                <InputBase
                    style={inputStyle}
                    multiline
                    rows={5}
                    rowsMax={10}
                    onChange={(e) => { handleGrivence(e) }}
                    placeholder="Write your grivence here..."
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFormSubmit}
                >
                    Submit
                </Button>

            </Paper>
        </Box>
    );
};

export default GrivenceMain;
