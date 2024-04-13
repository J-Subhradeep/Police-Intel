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
} from '@mui/material';
import Rating from '@mui/material/Rating';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { baseUrls, color } from '../../../GlobalConfig/config';


const FeedbackMain = ({visitorAndPsArray, handleDialogOpen, handleError}) => {

    const [feedback, setFeedback] = useState("");

    const [rating, setRating] = useState('1');

    const handleFeedback = (event) => {
        setFeedback(event.target.value);
    };

    const handleRating = (event) => {
        setRating(event.target.value);
    };

    const [selectedOption, setSelectedOption] = React.useState(0);

    const handleSelect = (event) => {
        setSelectedOption(event.target.value);
    };

    
    console.log(visitorAndPsArray)

    const handleFormSubmit = () => {
        postReview();
        setLoading(true);
    };

    const [loading, setLoading] = useState(false)

    async function postReview() {
        try {
            const submit = await axios({
                method: 'post',
                url: `${baseUrls.backEndUrl}/action/review/save` ,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    "visitorId": localStorage.getItem('visitorId'),
                    "visitingTimeId": visitorAndPsArray[selectedOption].visitingTimeId,
                    "policeStationId": visitorAndPsArray[selectedOption].psId,
                    "review": feedback,
                    "rating": rating
                }

            });

            handleDialogOpen();
            handleError(true, "Feedback Submitted.", "Thank you.");
            console.log(submit)
            setLoading(false);

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
                height: 'calc(100vh - 4.3rem)',
                overflowX: 'hidden',
                overflowY: 'scroll'
            }}
        >
            <Container component="main" maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2.5rem' }}>
                {/* Heading above the radio buttons */}
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Select your police station visit for which you want to give your feedback
                </Typography>

            </Container>

            <Container component="main" maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <FormControl>
                    {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={selectedOption}
                        onChange={handleSelect}
                    >
                        {visitorAndPsArray.map((item, index) => (
                            <FormControlLabel key={index} value={index} control={<Radio />} label={
                                <div>
                                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.psName}, </span>
                                    <span style={{ fontSize: '14px' }}>{item.address}, </span>
                                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>You visited on </span>
                                    <span style={{ fontSize: '14px' }}>{item.visitTime}</span>
                                </div>
                            } />
                        ))}
                    </RadioGroup>
                </FormControl>

            </Container>
            <Paper elevation={3} style={paperStyle} sx={{ width: { xs: '75%', md: '40%' }, marginTop: '20px' }}>
                <Typography variant='h6'>Rate Your Visit Experience</Typography>
                <Rating  name="simple-controlled" value={rating} onChange={(e) => { handleRating(e) }} size="large" sx={{ margin: '10px' }} />
                <InputBase
                    style={inputStyle}
                    multiline
                    rows={5}
                    rowsMax={10}
                    onChange={(e) => { handleFeedback(e) }}
                    placeholder="Write your feedback here..."
                />
                <Button
                    variant="contained"
                    disabled={loading}
                    sx={{
                    bgcolor: color.color1,
                    '&:hover': {
                        bgcolor: color.color2, // Change to the desired hover color
                    } 
                    }}
                    onClick={handleFormSubmit}
                >
                    {loading ? 'Wait...' : 'Submit'}
                </Button>

            </Paper>
        </Box>
    );
};

export default FeedbackMain;
