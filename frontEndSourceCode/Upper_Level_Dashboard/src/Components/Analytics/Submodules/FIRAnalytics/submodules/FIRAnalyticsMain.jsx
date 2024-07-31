import React, { useEffect, useState } from 'react';
import { Typography, Select, MenuItem, TextField, Box, IconButton, Button, FormControl } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from '@mui/material/Autocomplete';
import { CardContent, Grid } from '@mui/material';
import { Assignment, PlaylistAddCheck, CheckCircle, AccessTime, Report, History } from '@mui/icons-material';
import FIRRegistererdPerDay from '../../ChartModule/Charts/FIRCharts/FIRRegisteredPerDay';
import CrimeCatagoryChart from '../../ChartModule/Charts/FIRCharts/CrimeCatagoryChart';
import CrimeType from '../../ChartModule/Charts/FIRCharts/CrimeType';
import AccusedGender from '../../ChartModule/Charts/FIRCharts/AccusedGender';
import AccusedSocialCategory from '../../ChartModule/Charts/FIRCharts/AccusedSocialCatagory';
import AccusedJob from '../../ChartModule/Charts/FIRCharts/AccusedJob';
import VictimGender from '../../ChartModule/Charts/FIRCharts/VictimGender';
import VictimJob from '../../ChartModule/Charts/FIRCharts/VictimJob';
import VictimSocialCategory from '../../ChartModule/Charts/FIRCharts/VictimSocialCatagory';
import { CardContainer, CardTitle, DataText, IconContainer, StyledCard } from '../Styles/Styles';
import SelectPoliceStation from '../../../../Common/SelectPoliceStation/SelectPoliceStation';

const data = [
    { heading: 'FIR Registered', data: '12', icon: <Assignment fontSize="large" /> },
    { heading: 'Case Pending', data: '7', icon: <PlaylistAddCheck fontSize="large" /> },
    { heading: 'Case Closed', data: '5', icon: <CheckCircle fontSize="large" /> },
    { heading: 'Average Response Time', data: '3 days', icon: <AccessTime fontSize="large" /> },
    { heading: 'Average Case Resolving Time', data: '21 days', icon: <History fontSize="large" /> },
    { heading: 'Henious Crime', data: '24%', icon: <Report fontSize="large" /> }
];

const options = ['ARSON', 'ASSAULT', 'BATTERY', 'BURGLARY', 'CONCEALED CARRY LICENSE VIOLATION', 'CRIM SEXUAL ASSAULT', 'CRIMINAL DAMAGE', 'CRIMINAL TRESPASS', 'DECEPTIVE PRACTICE', 'DOMESTIC VIOLENCE', 'GAMBLING', 'HOMICIDE', 'HUMAN TRAFFICKING', 'INTERFERENCE WITH PUBLIC OFFICER', 'INTIMIDATION', 'KIDNAPPING', 'LIQUOR LAW VIOLATION', 'MOTOR VEHICLE THEFT', 'NARCOTICS', 'NON-CRIMINAL', 'NON-CRIMINAL (SUBJECT SPECIFIED)', 'OBSCENITY', 'OFFENSE INVOLVING CHILDREN', 'OTHER NARCOTIC VIOLATION', 'OTHER OFFENSE', 'PROSTITUTION', 'PUBLIC INDECENCY', 'PUBLIC PEACE VIOLATION', 'RITUALISM', 'ROBBERY', 'SEX OFFENSE', 'STALKING', 'THEFT', 'WEAPONS VIOLATION'];

const FIRAnalyticsMain = () => {

    const [showCharts, setShowCharts] = useState(false)
    const [startDate, setStartDate] = useState(getDefaultStartDate());
    const [endDate, setEndDate] = useState(getDefaultEndDate());

    function getDefaultEndDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const currentDate = `${year}-${month}-${day}`;

        return currentDate;
    }

    function getDefaultStartDate() {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 7);
        return currentDate.toISOString().split('T')[0];
    }

    const [value, setValue] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const [showCrimeCatagoryAnalysis, setShowCrimeCatagoryAnalysis] = React.useState(false)

    const handleCrimeCatagory = () => {
        setShowCrimeCatagoryAnalysis(true);
    }

    return (
        <div style={{ height: 'calc(100vh - 4.3rem)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'scroll', overflowX: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '80px', width: '100%', marginTop: '30px', paddingLeft: '30px' }}>
                <Typography variant="h5" gutterBottom>
                    <IconButton aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    FIR Analytics
                </Typography>
            </div>

            <div className='filter-section' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%', marginTop: '30px' }}>
                <SelectPoliceStation/>
                <Typography variant="h6">Filter Options</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px' }}>
                    <Box sx={{ display: 'flex', gap: '16px', width: '100%' }}>
                        <TextField
                            id="start-date"
                            label="Start Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />

                        <TextField
                            id="end-date"
                            label="End Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<SearchIcon />}
                    onClick={() => setShowCharts(true)}
                >
                    Filter
                </Button>
            </div>
            {showCharts && (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <div style={{ width: '100%', marginTop: "40px" }}>
                        <Grid container spacing={3} >
                            {data.map((item, index) => (
                                <Grid sx={{ display: "flex", justifyContent: "center" }} item xs={12} md={4} key={index}>
                                    <StyledCard>
                                        <CardContent>
                                            <CardContainer>
                                                <IconContainer>{item.icon}</IconContainer>
                                                <CardTitle>
                                                    {item.heading}
                                                </CardTitle>
                                                <DataText>
                                                    {item.data}
                                                </DataText>
                                            </CardContainer>
                                        </CardContent>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    <div className='charts-section' style={{ marginTop: '40px', paddingBottom: "30px" }}>
                        <FIRRegistererdPerDay />
                        <br />
                        <br />
                        <CrimeCatagoryChart />
                        <br />
                        <br />
                        <CrimeType />
                    </div>

                    <Typography sx={{ marginTop: "20px" }} variant="h5" gutterBottom>
                        Catagory Wise Crime Insights
                    </Typography>

                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={options}
                        sx={{ width: 300, marginTop: "20px" }}
                        renderInput={(params) => <TextField {...params} label="Crime Catagory" />}
                    />

                    <Button
                        variant="contained"
                        startIcon={<SearchIcon />}
                        onClick={handleCrimeCatagory}
                        sx={{ marginTop: "20px", marginBottom: "20px" }}
                    >
                        Filter
                    </Button>

                    {showCrimeCatagoryAnalysis && (
                        <div>
                            <AccusedGender />
                            <br />
                            <br />
                            <AccusedSocialCategory />
                            <br />
                            <br />
                            <AccusedJob />
                            <br />
                            <br />
                            <VictimGender />
                            <br />
                            <br />
                            <VictimSocialCategory />
                            <br />
                            <br />
                            <VictimJob />
                            <br />
                            <br />
                        </div>
                    )}
                </div>
            )}

        </div>
    );

};

export default FIRAnalyticsMain;
