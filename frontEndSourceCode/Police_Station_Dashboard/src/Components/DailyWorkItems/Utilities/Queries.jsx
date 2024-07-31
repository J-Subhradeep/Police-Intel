import axios from "axios";
import { baseUrls, elasticSearchPassword, elasticSearchUserName } from "../../../GlobalConfig/config"

export async function getOfficer(id, setofficerName) {

    try {
        const userResponse = await axios({
            method: 'post',  // Use 'post' method for sending data in the request body
            url: `${baseUrls.elasticSearchUrl}/officer_repository/_search`,
            headers: {
                Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
                'Content-Type': 'application/json',
            },
            data:
            {
                "query": {
                    "match": {
                        "id": id
                    }
                }
            }
        });

        setofficerName(userResponse.data.hits.hits[0]._source.name)

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getWorkItems(setTableData, fromDate, toDate) {

    try {
        const userResponse = await axios({
            method: 'post',  // Use 'post' method for sending data in the request body
            url: `${baseUrls.elasticSearchUrl}/jobs/_search`,
            headers: {
                Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
                'Content-Type': 'application/json',
            },
            data:
            {
                "query": {
                    "bool": {
                        "must": [
                            {
                                "match": {
                                    "police_station_id": localStorage.getItem("PsId")
                                }
                            },
                            {
                                "range": {
                                    "submit_time": {
                                        "gte": fromDate,
                                        "lte": toDate
                                    }
                                }
                            }
                        ]
                    }
                },
                "sort": {
                    "submit_time": {
                        "order": "desc"
                    }
                },
                "size": 1000
            }
        });

        let arr = []

        userResponse.data.hits.hits.forEach(element => {

            let dateTimeString = element._source.submit_time;
            let dateTime = new Date(dateTimeString);

            const options = {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };

            let formattedDateTime = dateTime.toLocaleDateString('en-US', options);

            arr.push({ id: element._source.id, title: element._source.title, submittedTime: formattedDateTime, description: element._source.description, doneId: element._source.done_id, file: element._source.file });
        });
        setTableData(arr);
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getOfficers(setofficers) {
    try {
        const userResponse = await axios({
            method: 'post',  // Use 'post' method for sending data in the request body
            url: `${baseUrls.elasticSearchUrl}/officer_repository/_search`,
            headers: {
                Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
                'Content-Type': 'application/json',
            },
            data:
            {
                "query": {
                    "match": {
                        "superior_id": localStorage.getItem("userId")
                    }
                },
                "sort": {
                    "id": {
                        "order": "asc"
                    }
                }
            }
        });

        let arr = []

        userResponse.data.hits.hits.forEach(element => {
            arr.push({ id: element._source.id, name: element._source.name, email: element._source.user_name.split("-")[1], designation: element._source.role, image: element._source.photo });
        });
        setofficers(arr);

    } catch (error) {
        console.error('Error:', error);
    }
}

export function addWorkFunc(workData, setOpenDialog2, setOpenDialog3, setWorkTitle, setDescription) {

    axios
        .post(`${baseUrls.backEndUrl}/task/manage/job/add-job`, workData, {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then((res) => {
            setOpenDialog2(false)
            setOpenDialog3(true)
            setWorkTitle('')
            setDescription('')
        })
        .catch((err) => {
            console.log(err);
        });
}