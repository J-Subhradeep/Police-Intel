import React from 'react'
import { Grid } from '@mui/material'
import SearchReviewsMain from './Submodules/SearchReviewsMain'
import Navbar from '../../Common/Navbar/Navbar'
import LeftSideBar from '../../Common/LeftSideBar/LeftSideBar'

const SearchReviews = () => {
    return (
        <div>
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={2.5}>
                    <LeftSideBar currentItem='visitor-logbook' />
                </Grid>
                <Grid item xs={9.5}>
                    <SearchReviewsMain />
                </Grid>
            </Grid>
        </div>
    )
}

export default SearchReviews