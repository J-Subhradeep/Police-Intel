import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import visitor_details from '../../../../assets/visitor.png'
import feedbacks from '../../../../assets/feedback.png'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { VisitorLogBookFrontPageWrapper } from '../Styles/VisitorLogBookFrontPage.styled';
import { Link } from "react-router-dom";

export const VisitorLogBookFrontPageMain = () => {
    return (
        <VisitorLogBookFrontPageWrapper>
            <div className='dashboard_main'>
                <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }} container spacing={2}>
                    <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} xs={3.5}>
                        <Link
                            to={`search-visitor-details`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className='dashboard_components'>
                                <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} spacing={2}>
                                    <img className='dashboard_image' src={visitor_details} />
                                    <Typography variant='h6'>
                                        Find Visitor Details
                                    </Typography>
                                </Stack>
                            </div>
                        </Link>
                    </Grid>
                    <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} xs={3.5}>
                        <Link
                            to={`feedbacks`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className='dashboard_components'>
                                <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} spacing={2}>
                                    <img className='dashboard_image' src={feedbacks} />
                                    <Typography variant='h6'>
                                        Feedbacks
                                    </Typography>
                                </Stack>
                            </div>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </VisitorLogBookFrontPageWrapper>
    )
}
