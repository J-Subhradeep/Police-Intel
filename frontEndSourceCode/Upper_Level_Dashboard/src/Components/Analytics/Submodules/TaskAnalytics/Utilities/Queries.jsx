import axios from "axios";
import { baseUrls, elasticSearchPassword, elasticSearchUserName } from "../../../../../GlobalConfig/config"

export async function taskDetails(startDate, endDate, getDefaultEndDate, setTaskData, setShowCharts) {

    try {
        const count = await axios({
            method: 'post',
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
                                        "gte": startDate,
                                        "lte": endDate
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
                                                "gte": getDefaultEndDate()
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
                                                "lt": getDefaultEndDate()
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

        });

        let data = {
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

export async function getWeeklyAnalytics(startDate, endDate, getDefaultEndDate, setDailyTaskDetails) {
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
                                        "gte": startDate,
                                        "lte": endDate
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
                                                        "gte": getDefaultEndDate()
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

        let array = []
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