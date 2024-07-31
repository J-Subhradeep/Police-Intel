import axios from "axios";
import { baseUrls, elasticSearchPassword, elasticSearchUserName } from "../../../../GlobalConfig/config"

export async function getFIRs(setFirList) {

    try {
        const firResponse = await axios({
            method: 'post',  // Use 'post' method for sending data in the request body
            url: `${baseUrls.elasticSearchUrl}/fir_details/_search`,
            headers: {
                Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
                'Content-Type': 'application/json',
            },
            data:
            {
              "query": {
                "match": {
                  "ps_id": localStorage.getItem("PsId")
                }
              },
              "sort": [
                {
                  "submissionTime": {
                    "order": "desc"
                  }
                }
              ]
            }
        });

        setFirList(firResponse.data.hits.hits)

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getFIRUpdates(setFirList) {

    try {
        const firResponse = await axios({
            method: 'post',  // Use 'post' method for sending data in the request body
            url: `${baseUrls.elasticSearchUrl}/fir_details/_search`,
            headers: {
                Authorization: "Basic " + btoa(elasticSearchUserName + ":" + elasticSearchPassword),
                'Content-Type': 'application/json',
            },
            data:
            {
                "query": {
                  "match": {
                    "ps_id": localStorage.getItem("PsId")
                  }
                }
              }
        });

        setFirList(firResponse.data.hits.hits)

    } catch (error) {
        console.error('Error:', error);
    }
}

export function postUpdate(formData, setIsSubmitting) {
    setIsSubmitting(true)
    console.log(formData)
    axios
      .post(`${baseUrls.backEndUrl}/fir-management/update/add-fir-update`, formData, {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then((res) => {
        console.log(res);
        setIsSubmitting(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  export function postChargesheet(formData, setIsSubmitting) {
    setIsSubmitting(true)
    console.log(formData)
    axios
      .post(`${baseUrls.backEndUrl}/fir-management/chargesheet/file-chargesheet`, formData, {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then((res) => {
        console.log(res);
        setIsSubmitting(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }