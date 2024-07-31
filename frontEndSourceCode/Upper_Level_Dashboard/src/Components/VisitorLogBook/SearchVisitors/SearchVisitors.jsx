import React from 'react'
import { Grid } from '@mui/material'
import SearchVisitorsMain from './Submodules/SearchVisitorsMain'
import LeftSideBar from '../../Common/LeftSideBar/LeftSideBar'
import Navbar from '../../Common/Navbar/Navbar'

const SearchVisitors = () => {
    return (
        <div>
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={2.5}>
                    <LeftSideBar currentItem='visitor-logbook' />
                </Grid>
                <Grid item xs={9.5}>
                    <SearchVisitorsMain />
                </Grid>
            </Grid>
        </div>
    )
}

export default SearchVisitors