import axios from "axios";
import { baseUrls, elasticSearchPassword, elasticSearchUserName } from "../../../../GlobalConfig/config";

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

export function addWorkFunc(workData, setOpenDialog2, setStep, setTaskTitle, setDescription) {

    axios
        .post('https://*****/task/manage/add-task', workData, {
            headers: {
                Authorization:
                    `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then((res) => {
            setOpenDialog2(false)
            setStep(1)
            setTaskTitle('')
            setDescription('')
        })
        .catch((err) => {
            console.log(err);
        });
}