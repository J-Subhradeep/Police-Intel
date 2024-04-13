import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import visitor_details from '../../../assets/visitor.png'
import visitors from '../../../assets/walking.png'
import feedbacks from '../../../assets/feedback.png'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';
import { VisitorLogBookWrapper } from '../Styles/VisitorLogBook.styled';


export const VisitorLogBookMain = () => {

    const navigate = useNavigate();

    const heandleClick1 = () => {
        navigate(`/entervisitordetails`);
    }
    const heandleClick2 = () => {
        navigate(`/searchvisitordetails`);
    }
    const heandleClick3 = () => {
        navigate(`/feedbacks`);
    }


    return (
        <VisitorLogBookWrapper>
            <div className='dashboard_main'>
                <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }} container spacing={2}>
                    <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} xs={3.5}>
                        <div className='dashboard_components' onClick={heandleClick2}>
                            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} spacing={2}>
                                <img className='dashboard_image' src={visitor_details} />
                                <Typography variant='h6'>
                                    Find Visitor Details
                                </Typography>
                            </Stack>
                        </div>
                    </Grid>
                    <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} xs={3.5}>
                        <div className='dashboard_components' onClick={heandleClick3}>
                            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} spacing={2}>
                                <img className='dashboard_image' src={feedbacks} />
                                <Typography variant='h6'>
                                    Feedbacks
                                </Typography>
                            </Stack>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </VisitorLogBookWrapper>
    )
}
