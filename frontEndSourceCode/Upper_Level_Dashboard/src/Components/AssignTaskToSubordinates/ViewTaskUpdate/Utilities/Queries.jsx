import axios from "axios";
import { elasticSearchPassword, elasticSearchUserName, baseUrls } from "../../../../GlobalConfig/config";

export async function fetchTasks(queries, pageNo, rows, setPageCount, setTableData, dateTime) {
    queries.push({
      "range": {
        "assigned_time": {
          "gte": dateTime.gte,
          "lte": dateTime.lte
        }
      }
    })
    console.log(queries)

    try {
      const response = await axios({
        method: 'post',  // Use 'post' method for sending data in the request body
        url: `${baseUrls.elasticSearchUrl}/tasks/_search`,
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
              "assigned_time": {
                "order": "desc"
              }
            }
          ],
          "from": (pageNo * rows),
          "size": rows
        }

      });

      setPageCount(response.data.hits.total.value)

      let arr = []

      response.data.hits.hits.forEach(element => {


        const dateTimeString = element._source.deadline;
        const dateTimeString2 = element._source.assigned_time;
        const dateTime = new Date(dateTimeString);
        const dateTime2 = new Date(dateTimeString2);

        // Format the date as desired
        const options = {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true // Display in 12-hour format with AM/PM
        };

        const formattedDateTime = dateTime.toLocaleDateString('en-US', options);
        const formattedDateTime2 = dateTime2.toLocaleDateString('en-US', options);


        arr.push({ id: element._source.id, title: element._source.title, assignedTime: formattedDateTime2, deadline: formattedDateTime, status: element._source.is_done, description: element._source.description, assigned_to_id: element._source.assigned_to_id, assigned_by_id: element._source.assigned_by_id })
      });

      console.log(arr)
      setTableData(arr);

    } catch (error) {
      console.error('Error:', error);
    }
  }

export const namefromid = async (id1, setofficerName1) => {
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
              "id": id1
            }
          }
        }
      });

      setofficerName1(userResponse.data.hits.hits[0]._source.name);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export async function fetchTaskUpdateDetails(taskId, setUpdateDescription, setUpdateTitle) {

    try {
      const response = await axios({
        method: 'post',  // Use 'post' method for sending data in the request body
        url: `${baseUrls.elasticSearchUrl}/task_updates/_search`,
        headers: {
          Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
          'Content-Type': 'application/json',
        },
        data: {
          "query": {
            "match": {
              "task_id": taskId
            }
          }
        }

      });

      setUpdateDescription(response.data.hits.hits[0]._source.description)
      setUpdateTitle(response.data.hits.hits[0]._source.title)
    } catch (error) {
      console.error('Error:', error);
    }
  }