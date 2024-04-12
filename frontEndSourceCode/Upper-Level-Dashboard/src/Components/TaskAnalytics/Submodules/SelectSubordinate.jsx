import React, { useEffect, useState } from 'react';
import { Typography, Select, MenuItem, Box, Button, FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrls, color, elasticSearchPassword, elasticSearchUserName } from '../../../GlobalConfig/config';

const SelectSubordinate = () => {
    const [officerNames, setOfficerNames] = useState([]);
    const [officerArray, setOfficerArray] = useState([]);
    const [officer, setOfficer] = useState('');

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

            // console.log(psResponse.data.hits.hits[0])

            // const promises = psResponse.data.hits.hits.map(element =>
            //     getPsNames(element._source.police_station_id)
            // );

            // await Promise.all(promises);

            let arr = [];

            psResponse.data.hits.hits.map(element =>
                arr.push({
                    name: element._source.name,
                    id: element._source.id
                })
            );

            let uniqueArray = removeDuplicates(arr);

            setOfficerArray(uniqueArray)


        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getOfficers();
    }, []);

    function removeDuplicates(arr) {
        return arr.filter((obj, index, self) =>
            index === self.findIndex((t) => (
                t.id === obj.id && t.name === obj.name
            ))
        );
    }

    useEffect(() => {
        const sortedArray = [...officerArray].sort((a, b) => a.name.localeCompare(b.name));
        setOfficerNames(sortedArray);
    }, [officerArray]);

    const handleChange = (event) => {
        setOfficer(event.target.value);
        console.log(event.target.value);
        localStorage.setItem("subordinateId", event.target.value.id);
    };


    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'hidden', overflowX: 'hidden' }}>
            <div className='filter-section' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%', marginTop: '0px' }}>
                {/* <Typography variant="h6">Select Officer</Typography> */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px' }}>
                    <FormControl>
                        <InputLabel id="demo-select-small-label">Officers</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={officer} // Update this line
                            label="Officers"
                            onChange={handleChange}
                        >
                            {officerNames.map((ps) => (
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

export default SelectSubordinate;
