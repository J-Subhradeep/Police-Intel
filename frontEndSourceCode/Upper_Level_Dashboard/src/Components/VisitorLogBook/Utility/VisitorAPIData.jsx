import axios from "axios";
import { baseUrls, elasticSearchPassword, elasticSearchUserName } from "../../../GlobalConfig/config";

const visitingTimesResponseData = async (queries, pageNo, rows) => {
    return await axios({
        method: 'post',  // Use 'post' method for sending data in the request body
        url: `${baseUrls.elasticSearchUrl}/visiting_times/_search`,
        headers: {
          Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
          'Content-Type': 'application/json',
        },
        data: {
          "query": {
            "bool": {
              "must": queries
            }
          },
          "sort": [
            {
              "visit_date_time": {
                "order": "desc"
              }
            }
          ],
          "from": (pageNo * rows),
          "size": rows
        }

      });

}

export {visitingTimesResponseData}