import axios from "axios";
import { baseUrls, elasticSearchPassword, elasticSearchUserName } from "../../../GlobalConfig/config";

async function getOfficerData(officerId) {
    try {
        const PSData = await axios({
            method: 'post',  // Use 'post' method for sending data in the request body
            url: `${baseUrls.elasticSearchUrl}/officer_repository/_search`,
            headers: {
                Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
                'Content-Type': 'application/json',
            },
            data: {
                "query": {
                    "match": {
                        "id": officerId
                    }
                }
            }

        });
        console.log(PSData.data.hits.hits[0]._source);
        localStorage.setItem('PsId', PSData.data.hits.hits[0]._source.police_station_id);
        localStorage.setItem('userId', PSData.data.hits.hits[0]._source.id);
        getPsData(PSData.data.hits.hits[0]._source.police_station_id)

    } catch (error) {
        console.error('Error:', error);
    }
}

async function getPsData(userId) {
    try {
        const userResponse = await axios({
            method: 'post',  // Use 'post' method for sending data in the request body
            url: `${baseUrls.elasticSearchUrl}/police_stations/_search`,
            headers: {
                Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
                'Content-Type': 'application/json',
            },
            data: {
                "query": {
                    "match": {
                        "id": userId
                    }
                }
            }
        });
        localStorage.setItem('psName', userResponse.data.hits.hits[0]._source.police_station_name)
        localStorage.setItem('psAddress', userResponse.data.hits.hits[0]._source.address)
        
    } catch (error) {
        console.error('Error:', error);
    }

}

export {getOfficerData}