import React, { useState } from "react";
import police from '../../../assets/police.webp'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TablePagination,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { orange, red, green } from "@mui/material/colors";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import SearchIcon from "@mui/icons-material/Search";
import { css } from "@emotion/react";
import * as config from "../../../GlobalConfig/config";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
/** @jsxImportSource @emotion/react */


const officerData = [
  { id: 1, name: "name1", designation: "DSP", email: "example@gmail.com", phone: "9191818177", image: "https://picsum.photos/id/238/200/300" },
  { id: 2, name: "name2", designation: "SP", email: "example@gmail.com", phone: "9191818177", image: "https://picsum.photos/id/239/200/300" },
  { id: 3, name: "name3", designation: "SP", email: "example@gmail.com", phone: "9191818177", image: "https://picsum.photos/id/240/200/300" },
  { id: 4, name: "name4", designation: "DSP", email: "example@gmail.com", phone: "9191818177", image: "https://picsum.photos/id/240/200/300" },
  { id: 5, name: "name5", designation: "SP", email: "example@gmail.com", phone: "9191818177", image: "https://picsum.photos/id/240/200/300" },
  { id: 6, name: "name6", designation: "DSP", email: "example@gmail.com", phone: "9191818177", image: "https://picsum.photos/id/240/200/300" },
];


// Emotion CSS styles
const tableContainerStyles = css`
  margin-top: 30px;
`;


const imageContainerStyle = css`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const imageStyle = css`
  max-width: 100%;
  max-height: 250px;
  border-radius: 8px;
`;

const OfficerList = () => {
  const [officers, setofficers] = useState([]);
  const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [designation, setdesignation] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedofficer, setSelectedofficer] = useState(null);
  const [searchTextName, setSearchTextName] = useState("");
  // const [searchTextPosting, setSearchTextPosting] = useState('');


  const handleChangeName = (event) => {
    setSearchTextName(event.target.value);
  };

  // const handleChangePosting = (event) => {
  //     setSearchTextPosting(event.target.value);
  //   };


  // const handleSearch = () => {
  //   // Perform search using Elasticsearch query with fromDate, toDate, and designation
  //   // This is just a placeholder for the actual Elasticsearch query implementation
  //   getOfficers();
  // };

  const [queryOptions, setQueryOptions] = useState([{
    match: {
      police_station_id: localStorage.getItem("PsId")
    }
  }]);

  const handleSearch = () => {

    const options = [{
      match: {
        police_station_id: localStorage.getItem("PsId")
      }
    }]

    // queryOptions.push({
    //   match: {
    //     police_station_id: localStorage.getItem("PsId")
    //   }
    // })

    if (searchTextName.length > 0) {
      options.push({
        match: {
          name: searchTextName
        }
      })
    }
    if (designation.length > 0) {
      options.push({
        match: {
          role: designation
        }
      })
    }
    console.log(options)
    // getResult(queryOptions);
    // setQueryOptions(options);
    getOfficers(options);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleofficerClick = (officer) => {
    // Check if the click target is not the "Mark as Done" button
    const tagName = window.event.target.tagName.toLowerCase();
    if (tagName !== "button") {
      setSelectedofficer(officer);
      // Set the title and description from the selected officer
      setTitle(officer.name);
      setDescription(officer.designation);
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
    getOfficers(queryOptions);
  }, [])

  async function getOfficers(query) {

    // console.log(userId)
    try {
      const userResponse = await axios({
        method: 'post',  // Use 'post' method for sending data in the request body
        url: `${config.baseUrls.elasticSearchUrl}/officer_repository/_search`,
        headers: {
          Authorization: "Basic " + btoa(config.elasticSearchUserName + ":" + config.elasticSearchPassword),
          'Content-Type': 'application/json',
        },
        data: {
          "query": {
            "bool": {
              "must": query
            }
          },
          "sort": {
            "id": {
              "order": "asc"
            }
          }
        }
      });

      console.log(userResponse.data.hits.hits)

      const arr = []

      userResponse.data.hits.hits.forEach(element => {
        arr.push({ id: element._source.id, name: element._source.name, email: element._source.user_name.split("-")[1], designation: element._source.role, image: element._source.photo });
      });
      console.log(arr)
      setofficers(arr);


    } catch (error) {
      console.error('Error:', error);
    }
  }

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
          onClick={handleSearch}
        >
          Filter
        </Button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer
          component={Paper}
          css={tableContainerStyles}
          sx={{
            // boxShadow: "0px 10px 10px #979797",
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
                {/* <TableCell sx={{color:config.color9,fontSize:"20px"}}>Posting</TableCell> */}
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
                    {/* <TableCell>{officer.posting}</TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={officers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>

      <Dialog open={selectedofficer !== null} onClose={handleCloseDialog}>
        <DialogTitle>{selectedofficer?.name}</DialogTitle>
        <DialogContent sx={{ width: "250px", textAlign: "center" }}>
          <Box css={imageContainerStyle}>
            {/* Image Component */}
            {/* if selectedofficer?.image field is empty, use a dummy stock image url */}
            <img
              src={selectedofficer?.image || police}
              alt={selectedofficer?.name}
              css={imageStyle}
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



export default OfficerList;