import React, { useEffect, useState } from 'react';
import { Typography, Select, MenuItem, Box, Button, FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrls, color, elasticSearchPassword, elasticSearchUserName } from '../../../GlobalConfig/config';

const SelectPoliceStationMain = ({ url }) => {
    const [policeStationNames, setPoliceStationNames] = useState([]);
    const [policeStationArray, setPoliceStationArray] = useState([]);
    const [policeStation, setPoliceStation] = useState('');

    async function getOfficers() {
        try {
            const psResponse = await axios({
                method: 'post',
                url: `${baseUrls.elasticSearchUrl}/officer_repository/_search`,
                headers: {
                    Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
                    'Content-Type': 'application/json',
                },
                data: {
                    "query": {
                        "match": {
                            "superior_id": localStorage.getItem("userId")
                        }
                    }
                }
            });

            const promises = psResponse.data.hits.hits.map(element =>
                getPsNames(element._source.police_station_id)
            );

            await Promise.all(promises);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function getPsNames(id) {
        try {
            const psResponse = await axios({
                method: 'post',
                url: `${baseUrls.elasticSearchUrl}/police_stations/_search`,
                headers: {
                    Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
                    'Content-Type': 'application/json',
                },
                data: {
                    "size": 100,
                    "query": {
                        "match": {
                            "id": id
                        }
                    }
                }
            });

            const newStation = {
                name: psResponse.data.hits.hits[0]._source.police_station_name,
                id: psResponse.data.hits.hits[0]._source.id
            };

            setPoliceStationArray(prevState => {
                // Check if the new station already exists in the array
                const exists = prevState.some(station => station.id === newStation.id);
                // If it doesn't exist, add it to the array
                if (!exists) {
                    return [...prevState, newStation];
                }
                // Otherwise, return the previous state unchanged
                return prevState;
            });

        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getOfficers();
    }, []);

    useEffect(() => {
        const sortedArray = [...policeStationArray].sort((a, b) => a.name.localeCompare(b.name));
        setPoliceStationNames(sortedArray);
    }, [policeStationArray]);

    const handleChange = (event) => {
        setPoliceStation(event.target.value);
        console.log(event.target.value);
        localStorage.setItem("PsId", event.target.value.id);
        localStorage.setItem("PsName", event.target.value.name);
    };

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate(url);
    }

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'hidden', overflowX: 'hidden' }}>
            <div className='filter-section' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%', marginTop: '10px' }}>
                <Typography variant="h6">Select Police Stations</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px' }}>
                    <FormControl>
                        <InputLabel id="demo-select-small-label">Police Station</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={policeStation} // Update this line
                            label="Police Station"
                            onChange={handleChange}
                        >
                            {policeStationNames.map((ps) => (
                                <MenuItem
                                    key={ps.id}
                                    value={ps}
                                >
                                    {ps.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </Box>
                {/* <Button sx={{
                    bgcolor: color.green1,
                    '&:hover': {
                        bgcolor: color.green2, // Change to the desired hover color
                    },
                }} onClick={handleSubmit} variant='contained'>Submit</Button> */}
            </div>
        </div>
    );
};

export default SelectPoliceStationMain;
