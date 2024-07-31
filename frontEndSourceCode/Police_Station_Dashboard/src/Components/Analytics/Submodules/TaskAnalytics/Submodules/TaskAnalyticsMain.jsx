import React, { useEffect, useState } from 'react';
import { Typography, TextField, Box, IconButton, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from "@mui/icons-material/Search";
import TaskPieChart from '../../ChartModule/Charts/TaskCharts/TaskPieChart';
import DailyTaskUpdateBarChart from '../../ChartModule/Charts/TaskCharts/DailyTaskUpdateBarChart';
import { getDefaultEndDate, getDefaultStartDate } from '../Utilities/Functions';
import { getWeeklyAnalytics, taskDetails } from '../Utilities/Queries';

const TaskAnalyticsMain = () => {
    const [dailyTaskDetails, setDailyTaskDetails] = useState([])
    const [showCharts, setShowCharts] = useState(false)
    const [taskData, setTaskData] = useState({})

    useEffect(() => {
        taskDetails(startDate, endDate, getDefaultEndDate, setTaskData, setShowCharts);
        getWeeklyAnalytics(startDate, endDate, getDefaultEndDate, setDailyTaskDetails);
    }, []);

    const [startDate, setStartDate] = useState(getDefaultStartDate());
    const [endDate, setEndDate] = useState(getDefaultEndDate());

    const handleSubmit = (event) => {
        taskDetails(startDate, endDate, getDefaultEndDate, setTaskData, setShowCharts);
        getWeeklyAnalytics(startDate, endDate, getDefaultEndDate, setDailyTaskDetails);
    }

    return (
        <div style={{ height: 'calc(100vh - 4.3rem)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'scroll', overflowX: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '80px', width: '100%', marginTop: '30px', paddingLeft: '30px' }}>
                <Typography variant="h5" gutterBottom>
                    <IconButton aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    Task Analytics
                </Typography>
            </div>


            <div className='filter-section' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%', marginTop: '30px' }}>
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
                    onClick={handleSubmit}
                >
                    Filter
                </Button>
            </div>

            {showCharts && (<div className='charts-section' style={{ marginTop: '40px', paddingBottom: "30px" }}>
                <TaskPieChart data={taskData} />
                <DailyTaskUpdateBarChart getDailyTaskArray={dailyTaskDetails} />
            </div>)}
        </div>
    );
};

export default TaskAnalyticsMain;
