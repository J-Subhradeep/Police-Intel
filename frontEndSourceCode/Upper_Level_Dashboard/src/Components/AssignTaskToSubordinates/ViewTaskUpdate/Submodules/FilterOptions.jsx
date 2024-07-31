import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import { handleSubmit } from '../Utilities/Functions';

const FilterOptions = ({setStatus, handleDateChange, page, rowsPerPage, setTableOpen, status, setPageCount, setTableData, dateTime}) => {
    return (
        <div style={{ marginTop: "20px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <InputLabel sx={{ marginRight: "10px" }} id="status-label">Status</InputLabel>
            <FormControl sx={{ marginRight: "20px" }}>
                <Select
                    labelId="status-label"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="false">Due</MenuItem>
                    <MenuItem value="true">Done</MenuItem>
                    <MenuItem value="passed">Passed</MenuItem>
                </Select>
            </FormControl>
            <InputLabel sx={{ marginRight: "10px" }} id="from-date-label">From</InputLabel>
            <FormControl sx={{ marginRight: "20px" }}>
                <input
                    name="gte"
                    type="date"
                    id="from-date"
                    value={dateTime.gte}
                    onChange={(e) => dateTime(e)} // This line needs to be changed
                    style={{ padding: "10px" }}
                />


            </FormControl>
            <InputLabel sx={{ marginRight: "10px" }} id="to-date-label">To</InputLabel>
            <FormControl sx={{ marginRight: "20px" }}>
                <input
                    name="lte"
                    type="date"
                    id="to-date"
                    value={dateTime.lte}
                    onChange={(e) => handleDateChange(e)} // This line needs to be changed
                    style={{ padding: "10px" }}
                />

            </FormControl>
            <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => handleSubmit(page, rowsPerPage, setTableOpen, status, setPageCount, setTableData, dateTime)} // Wrap handleSubmit in an anonymous function
            >
                Filter
            </Button>
        </div>
    )
}

export default FilterOptions
