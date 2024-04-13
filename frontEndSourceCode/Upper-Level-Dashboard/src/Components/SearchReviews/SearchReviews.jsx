import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Grid } from '@mui/material'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import SearchReviewsMain from './Submodules/SearchReviewsMain'

const SearchReviews = () => {
    return (
        <div>
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={2.5}>
                    <LeftSideBar currentItem='visitorLogBook' />
                </Grid>
                <Grid item xs={9.5}>
                    <SearchReviewsMain />
                </Grid>
            </Grid>
        </div>
    )
}

export default SearchReviews