import { css } from "@emotion/react";
import axios from "axios";
import { baseUrls, elasticSearchPassword, elasticSearchUserName } from "../../../GlobalConfig/config"

export const tableContainerStyles = css`
  margin-top: 30px;
`;

export const imageContainerStyle = css`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const imageStyle = css`
  max-width: 100%;
  max-height: 250px;
  border-radius: 8px;
`;

export const handleSearch = (searchTextName, designation, getOfficers, setOfficers) => {
  let options = [{
    match: {
      police_station_id: localStorage.getItem("PsId")
    }
  }]

  if (searchTextName.length > 0) {
    options.push({
      match: {
        name: searchTextName
      }
    })
  }
  if (designation.length > 0 && designation!= "all") {
    options.push({
      match: {
        role: designation
      }
    })
  }
  console.log(options)
  getOfficers(options, setOfficers);
};

export async function getOfficers(query, setofficers) {
  try {
    const userResponse = await axios({
      method: 'post',  // Use 'post' method for sending data in the request body
      url: `${baseUrls.elasticSearchUrl}/officer_repository/_search`,
      headers: {
        Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
        'Content-Type': 'application/json',
      },
      data: {
        "query": {
          "bool": {
            "must": query
          }
        },
        "sort": {
          "id": {
            "order": "asc"
          }
        }
      }
    });

    console.log(userResponse.data.hits.hits)

    let arr = []

    userResponse.data.hits.hits.forEach(element => {
      arr.push({ id: element._source.id, name: element._source.name, email: element._source.user_name.split("-")[1], designation: element._source.role, image: element._source.photo });
    });
    console.log(arr)
    setofficers(arr);


  } catch (error) {
    console.error('Error:', error);
  }
}