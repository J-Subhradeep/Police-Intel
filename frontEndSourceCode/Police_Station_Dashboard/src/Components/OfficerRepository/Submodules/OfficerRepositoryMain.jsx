import React, { useState } from "react";
import police from '../../../assets/police.webp'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel, TablePagination, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as config from "../../../GlobalConfig/config";
import TextField from '@mui/material/TextField';
import { getOfficers, handleSearch, imageContainerStyle, imageStyle, tableContainerStyles } from "../Utilities/Utilities";

const OfficerRepositoryMain = () => {
  const [officers, setofficers] = useState([]);
  const [designation, setdesignation] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedofficer, setSelectedofficer] = useState(null);
  const [searchTextName, setSearchTextName] = useState("");


  const handleChangeName = (event) => {
    setSearchTextName(event.target.value);
  };

  const queryOptions = {
    match: {
      police_station_id: localStorage.getItem("PsId")
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleofficerClick = (officer) => {
    const tagName = window.event.target.tagName.toLowerCase();
    if (tagName !== "button") {
      setSelectedofficer(officer);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleCloseDialog = () => {
    setSelectedofficer(null);
  };

  React.useEffect(() => {
    getOfficers(queryOptions, setofficers);
  }, [])

  return (
    <div style={{ margin: "20px 40px" }}>
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <InputLabel sx={{ marginRight: "10px" }} id="designation-label">Designation</InputLabel>
        <FormControl sx={{ marginRight: "20px" }}>

          <Select
            labelId="designation-label"
            id="designation"
            value={designation}
            onChange={(e) => setdesignation(e.target.value)}
            sx={{ marginTop: "5px" }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="PI">PI</MenuItem>
            <MenuItem value="PSI">PSI</MenuItem>
            <MenuItem value="Constable">Constable</MenuItem>
          </Select>
        </FormControl>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField sx={{ marginRight: "20px" }}
            label="Offcer Name"
            variant="outlined"
            value={searchTextName}
            onChange={handleChangeName}
          />
        </div>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={() => handleSearch(searchTextName, designation, getOfficers, setofficers)}
        >
          Filter
        </Button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer
          component={Paper}
          css={tableContainerStyles}
          sx={{
            border: "0.5px solid  #979797",
            width: "80%"
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ background: config.color5 }}>
                <TableCell sx={{ color: config.color9, fontSize: "20px", paddingLeft: "80px" }}>ID</TableCell>
                <TableCell sx={{ color: config.color9, fontSize: "20px" }}>Name</TableCell>
                <TableCell sx={{ color: config.color9, fontSize: "20px" }}>Email</TableCell>
                <TableCell sx={{ color: config.color9, fontSize: "20px", paddingRight: "0px" }}>Rank</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ cursor: 'pointer' }}>
              {officers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((officer) => (
                  <TableRow key={officer.id} sx={{ '&:hover': { backgroundColor: config.color8 } }} onClick={() => handleofficerClick(officer)}>
                    <TableCell sx={{ paddingLeft: "80px" }}>{officer.id}</TableCell>
                    <TableCell>{officer.name}</TableCell>
                    <TableCell>{officer.email}</TableCell>
                    <TableCell sx={{ paddingRight: "0px" }}>{officer.designation}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={officers.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
        </TableContainer>
      </div>

      <Dialog open={selectedofficer !== null} onClose={handleCloseDialog}>
        <DialogTitle>{selectedofficer?.name}</DialogTitle>
        <DialogContent sx={{ width: "250px", textAlign: "center" }}>
          <Box css={imageContainerStyle}>
            <img
              src={selectedofficer?.image || police}
              alt={selectedofficer?.name}
              style={imageStyle}
            />
          </Box>
          <Typography variant="body1">ID: {selectedofficer?.id}</Typography>
          <Typography variant="body1">Name: {selectedofficer?.name}</Typography>
          <Typography variant="body1">Email: {selectedofficer?.email}</Typography>
          <Typography variant="body1">Designation: {selectedofficer?.designation}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OfficerRepositoryMain;