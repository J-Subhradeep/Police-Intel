import axios from "axios";
import { baseUrls, elasticSearchPassword, elasticSearchUserName } from "../../../../../GlobalConfig/config"

export async function getDailyVisitorsAndReviewCount(startDate, endDate, setGetDailyVisitorsAndReviewCountArray, setShowCharts) {

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
                                        "gte": startDate,
                                        "lte": endDate
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

        console.log(count)

        let array = []
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

export async function positiveAndNegativeReviewsCount(startDate, endDate, setPositivity, setShowCharts) {

    try {
        const count = await axios({
            method: 'post',
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
                                        "gte": startDate,
                                        "lte": endDate
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

export async function ratingsCount(startDate, endDate, setRatings, setShowCharts) {

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
                                        "gte": startDate,
                                        "lte": endDate
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