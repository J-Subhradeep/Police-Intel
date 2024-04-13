import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Grid } from '@mui/material'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import SearchVisitorsMain from './Submodules/SearchVisitorsMain'

const SearchVisitors = () => {
    return (
        <div>
            <Navbar />
            <Grid container spacing={0}>
                <Grid item xs={2.5}>
                    <LeftSideBar currentItem='visitorLogBook' />
                </Grid>
                <Grid item xs={9.5}>
                    <SearchVisitorsMain />
                </Grid>
            </Grid>
        </div>
    )
}

export default SearchVisitors