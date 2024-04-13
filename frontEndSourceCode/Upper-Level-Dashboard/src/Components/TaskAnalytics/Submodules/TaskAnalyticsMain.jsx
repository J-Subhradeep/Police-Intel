import React, { useEffect, useState } from 'react';
import { Typography, Select, MenuItem, TextField, Box, IconButton, Button, FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import Ratings from '../../ChartModule/Charts/Ratings';
import { baseUrls, elasticSearchPassword, elasticSearchUserName } from '../../../GlobalConfig/config';
import DailyVisitorsAndReviewsCount from '../../ChartModule/Charts/FeedbackCharts/DailyVisitorsAndReviewsCount';
import PositiveAndNegativeReviews from '../../ChartModule/Charts/FeedbackCharts/PositiveAndNegativeReviews';
import TaskPieChart from '../../ChartModule/Charts/TaskCharts/TaskPieChart';
import DailyTaskUpdateBarChart from '../../ChartModule/Charts/TaskCharts/DailyTaskUpdateBarChart';
import SelectSubordinate from './SelectSubordinate';

const TaskAnalyticsMain = () => {
    const [policeStationNames, setPoliceStationNames] = useState([])

    const [dailyTaskDetails, setDailyTaskDetails] = useState([])

    const [showCharts, setShowCharts] = useState(false)

    const [taskData, setTaskData] = useState({})

    const [policeStation, setPoliceStation] = useState();

    console.log(policeStation)
    const [startDate, setStartDate] = useState(getDefaultStartDate());
    const [endDate, setEndDate] = useState(getDefaultEndDate());

    const handleChange = (event) => {
        setPoliceStation(event.target.value);

        console.log(event.target)
    };

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
        currentDate.setDate(currentDate.getDate() - 7); // Subtract 7 days
        return currentDate.toISOString().split('T')[0]; // Get the resulting date in "YYYY-MM-DD" format
    }

    const handleSubmit = (event) => {
        taskDetails()
        getWeeklyAnalytics()
        console.log('subbbbb')
    }

    function formatedDateTime(originalDate) {
        // Parse the input date string
        const dateObject = new Date(originalDate);

        // Subtract 5 hours and 30 minutes
        dateObject.setHours(dateObject.getHours() - 5);
        dateObject.setMinutes(dateObject.getMinutes() - 30);

        // Format the date in "YYYY-MM-DDTHH:mm:ss.sssZ" format
        const formattedDate = dateObject.toISOString();

        console.log("new date:", formattedDate)
        return formattedDate;
    }

    async function taskDetails() {

        try {
            const count = await axios({
                method: 'post',  // Use 'post' method for sending data in the request body
                url: `${baseUrls.elasticSearchUrl}/tasks/_search`,
                headers: {
                    Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
                    'Content-Type': 'application/json',
                },
                data: {
                    "size": 0,
                    "query": {
                        "bool": {
                            "must": [
                                {
                                    "term": {
                                        "assigned_to_id": {
                                            "value": localStorage.getItem("subordinateId")
                                        }
                                    }
                                },
                                {
                                    "range": {
                                        "assigned_time": {
                                            "gte": formatedDateTime(startDate),
                                            "lte": formatedDateTime(endDate)
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "aggs": {
                        "done_tasks": {
                            "filter": {
                                "bool": {
                                    "must": [
                                        {
                                            "term": {
                                                "is_done": true
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        "pending_tasks": {
                            "filter": {
                                "bool": {
                                    "must": [
                                        {
                                            "range": {
                                                "deadline": {
                                                    "gte": "now",
                                                    "time_zone": "+05:30"
                                                }
                                            }
                                        },
                                        {
                                            "term": {
                                                "is_done": false
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        "missed_tasks": {
                            "filter": {
                                "bool": {
                                    "must": [
                                        {
                                            "range": {
                                                "deadline": {
                                                    "lt": "now",
                                                    "time_zone": "+05:30"
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }

            });

            console.log(count.data.aggregations)

            const data = {
                done: count.data.aggregations.done_tasks.doc_count,
                missed: count.data.aggregations.missed_tasks.doc_count,
                pending: count.data.aggregations.pending_tasks.doc_count
            }

            setTaskData(data);

            setShowCharts(true)

        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function getWeeklyAnalytics() {

        // console.log("startdate: ", startDate)

        try {
            const count = await axios({
                method: 'post',  // Use 'post' method for sending data in the request body
                url: `${baseUrls.elasticSearchUrl}/tasks/_search`,
                headers: {
                    Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
                    'Content-Type': 'application/json',
                },
                data: {
                    "size": 0,
                    "query": {
                        "bool": {
                            "filter": [
                                {
                                    "range": {
                                        "assigned_time": {
                                            "gte": formatedDateTime(startDate),
                                            "lte": formatedDateTime(endDate),
                                        }
                                    }
                                },
                                {
                                    "term": {
                                        "assigned_to_id": {
                                            "value": localStorage.getItem("subordinateId")
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "aggs": {
                        "weekly_task_analytics": {
                            "date_histogram": {
                                "field": "assigned_time",
                                "fixed_interval": "1d",
                                "format": "yyyy-MM-dd",
                                "time_zone": "+05:30"
                            },
                            "aggs": {
                                "total_tasks": {
                                    "value_count": {
                                        "field": "id"
                                    }
                                },
                                "pending_tasks": {
                                    "filter": {
                                        "bool": {
                                            "must": [
                                                {
                                                    "range": {
                                                        "deadline": {
                                                            "gte": "now",
                                                            "time_zone": "+05:30"
                                                        }
                                                    }
                                                },
                                                {
                                                    "term": {
                                                        "is_done": {
                                                            "value": false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    "aggs": {
                                        "total_pending_tasks": {
                                            "value_count": {
                                                "field": "id"
                                            }
                                        }
                                    }
                                },
                                "missed_tasks": {
                                    "filter": {
                                        "bool": {
                                            "must": [
                                                {
                                                    "range": {
                                                        "deadline": {
                                                            "lt": getDefaultEndDate()
                                                            // "time_zone": "+05:30"
                                                        }
                                                    }
                                                },
                                                {
                                                    "term": {
                                                        "is_done": {
                                                            "value": false
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    "aggs": {
                                        "total_missed_tasks": {
                                            "value_count": {
                                                "field": "id"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            });

            console.log(count)

            const array = []
            count.data.aggregations.weekly_task_analytics.buckets.forEach(element => {
                array.push(
                    {
                        date: element.key_as_string,
                        total_tasks: element.total_tasks.value,
                        missed_tasks: element.missed_tasks.total_missed_tasks.value,
                        pending_tasks: element.pending_tasks.total_pending_tasks.value,
                        done_tasks: element.total_tasks.value - element.pending_tasks.total_pending_tasks.value - element.missed_tasks.total_missed_tasks.value,
                    }
                )
            });
            console.log(array)
            setDailyTaskDetails(array)

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const [ratings, setRatings] = useState({})

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
                    <SelectSubordinate />

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

            {showCharts && (<div className='charts-section' style={{ marginTop: '40px' }}>
                <TaskPieChart data={taskData} />
                <DailyTaskUpdateBarChart getDailyTaskArray={dailyTaskDetails} />
            </div>)}
        </div>
    );
};

export default TaskAnalyticsMain;
