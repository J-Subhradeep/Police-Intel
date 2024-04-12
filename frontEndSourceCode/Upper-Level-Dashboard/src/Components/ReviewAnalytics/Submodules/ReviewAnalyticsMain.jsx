import React, { useEffect, useState } from 'react';
import { Typography, Select, MenuItem, TextField, Box, IconButton, Button, FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import Ratings from '../../ChartModule/Charts/Ratings';
import SelectPoliceStation from '../../SelectPoliceStation/SelectPoliceStation';
import DailyVisitorsAndReviewsCount from '../../ChartModule/Charts/FeedbackCharts/DailyVisitorsAndReviewsCount';
import PositiveAndNegativeReviews from '../../ChartModule/Charts/FeedbackCharts/PositiveAndNegativeReviews';
import { baseUrls, elasticSearchPassword, elasticSearchUserName } from '../../../GlobalConfig/config';

const ReviewAnalyticsMain = () => {
    const [policeStationNames, setPoliceStationNames] = useState([])

    const [showCharts, setShowCharts] = useState(false)

    const [getDailyVisitorsAndReviewCountArray, setGetDailyVisitorsAndReviewCountArray] = useState([]);

    const [positivity, setPositivity] = useState({});

    const [policeStation, setPoliceStation] = useState();

    console.log(policeStation)
    const [startDate, setStartDate] = useState(getDefaultStartDate());
    const [endDate, setEndDate] = useState(getDefaultEndDate());

    const handleChange = (event) => {
        setPoliceStation(event.target.value);

        console.log(event.target)
    };

    function getDefaultEndDate() {
        const currentDate = new Date();
        return currentDate.toISOString().split('T')[0];
    }

    function getDefaultStartDate() {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 7); // Subtract 7 days
        return currentDate.toISOString().split('T')[0]; // Get the resulting date in "YYYY-MM-DD" format
    }

    const handleSubmit = (event) => {
        getDailyVisitorsAndReviewCount();
        positiveAndNegativeReviewsCount();
        ratingsCount();
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

    async function getDailyVisitorsAndReviewCount() {

        // console.log("startdate: ", startDate)

        try {
            const count = await axios({
                method: 'post',  // Use 'post' method for sending data in the request body
                url: `${baseUrls.elasticSearchUrl}/visiting_times/_search`,
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
                                        "visit_date_time": {
                                            "gte": formatedDateTime(startDate),
                                            "lte": formatedDateTime(endDate)
                                        }
                                    }
                                },
                                {
                                    "term": {
                                        "police_station_id": {
                                            "value": localStorage.getItem("PsId")
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "aggs": {
                        "visiting_times_per_day": {
                            "date_histogram": {
                                "field": "visit_date_time",
                                "fixed_interval": "1d",
                                "format": "yyyy-MM-dd"
                            },
                            "aggs": {
                                "total_visits": {
                                    "value_count": {
                                        "field": "id"
                                    }
                                },
                                "is_review_done_true": {
                                    "sum": {
                                        "field": "is_review_done"
                                    }
                                }
                            }
                        }
                    }
                }



            });

            // console.log(count.data.aggregations.visiting_times_per_day.buckets[1].is_review_done_true.value)
            console.log(count)

            const array = []
            count.data.aggregations.visiting_times_per_day.buckets.forEach(element => {
                array.push(
                    {
                        date: element.key_as_string,
                        visitorCount: element.total_visits.value,
                        reviewCount: element.is_review_done_true.value
                    }
                )
            });
            console.log(array)
            setGetDailyVisitorsAndReviewCountArray(array)

            setShowCharts(true)

        } catch (error) {
            console.error('Error:', error);
        }
    }


    async function positiveAndNegativeReviewsCount() {

        try {
            const count = await axios({
                method: 'post',  // Use 'post' method for sending data in the request body
                url: `${baseUrls.elasticSearchUrl}/reviews/_search`,
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
                                        "police_station_id": {
                                            "value": localStorage.getItem("PsId")
                                        }
                                    }
                                },
                                {
                                    "range": {
                                        "review_timestamp": {
                                            "gte": formatedDateTime(startDate),
                                            "lte": formatedDateTime(endDate)
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "aggs": {
                        "positive_reviews": {
                            "filter": {
                                "bool": {
                                    "must": [
                                        { "term": { "is_positive": true } }
                                    ]
                                }
                            }
                        },
                        "negative_reviews": {
                            "filter": {
                                "bool": {
                                    "must": [
                                        { "term": { "is_positive": false } }
                                    ]
                                }
                            }
                        }
                    }
                }



            });

            const positive = {
                negative: count.data.aggregations.negative_reviews.doc_count,
                positive: count.data.aggregations.positive_reviews.doc_count
            }

            setPositivity(positive)

            setShowCharts(true)

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const [ratings, setRatings] = useState({})

    async function ratingsCount() {

        try {
            const count = await axios({
                method: 'post',  // Use 'post' method for sending data in the request body
                url: `${baseUrls.elasticSearchUrl}/reviews/_search`,
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
                                        "police_station_id": {
                                            "value": localStorage.getItem("PsId")
                                        }
                                    }
                                },
                                {
                                    "range": {
                                        "review_timestamp": {
                                            "gte": formatedDateTime(startDate),
                                            "lte": formatedDateTime(endDate)
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "aggs": {
                        "one": {
                            "filter": {
                                "bool": {
                                    "must": [
                                        { "term": { "rating": 1 } }
                                    ]
                                }
                            }
                        },
                        "two": {
                            "filter": {
                                "bool": {
                                    "must": [
                                        { "term": { "rating": 2 } }
                                    ]
                                }
                            }
                        },
                        "three": {
                            "filter": {
                                "bool": {
                                    "must": [
                                        { "term": { "rating": 3 } }
                                    ]
                                }
                            }
                        },
                        "four": {
                            "filter": {
                                "bool": {
                                    "must": [
                                        { "term": { "rating": 4 } }
                                    ]
                                }
                            }
                        },
                        "five": {
                            "filter": {
                                "bool": {
                                    "must": [
                                        { "term": { "rating": 5 } }
                                    ]
                                }
                            }
                        }
                    }
                }



            });

            console.log(count)

            const ratingsData = {
                one: count.data.aggregations.one.doc_count,
                two: count.data.aggregations.two.doc_count,
                three: count.data.aggregations.three.doc_count,
                four: count.data.aggregations.four.doc_count,
                five: count.data.aggregations.five.doc_count
            }


            console.log(ratingsData)

            setRatings(ratingsData)

            setShowCharts(true)

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div style={{ height: 'calc(100vh - 4.3rem)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'scroll', overflowX: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '80px', width: '100%', marginTop: '30px', paddingLeft: '30px' }}>
                <Typography variant="h5" gutterBottom>
                    <IconButton aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    Feedback Analytics of {localStorage.getItem("PsName")}
                </Typography>
            </div>

            <SelectPoliceStation url={"/analytics"}/>
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

            {showCharts && (<div className='charts-section' style={{ marginTop: '40px' }}>
                <DailyVisitorsAndReviewsCount getDailyVisitorsAndReviewCountArray={getDailyVisitorsAndReviewCountArray} />
                <PositiveAndNegativeReviews positivity={positivity} />
                <Ratings ratings={ratings} />
            </div>)}
        </div>
    );
};

export default ReviewAnalyticsMain;
