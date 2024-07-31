import { styled } from '@mui/material/styles';
import { createTheme } from "@mui/material/styles";
import {
  Button,
} from "@mui/material";
import axios from "axios";
import { baseUrls, elasticSearchPassword, elasticSearchUserName } from "../../../../GlobalConfig/config"

export const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 33,
  padding: '0 8px',
  marginTop: '5px',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
  },
}));

export const GradientButton2 = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 33,
  padding: '0 8px',
  marginTop: '5px',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
  },
  position: 'absolute', bottom: 1, right: 1, margin: '5px'
}));

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

export async function getOfficer(id, setPoliceOfficerName, setOfficerDesig) {
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
          "match": {
            "id": id
          }
        }
      }

    });

    if (userResponse.data.hits.hits.length == 0) {
      setPoliceOfficerName("Invalid ID");
      setOfficerDesig("Invalid ID");
    } else {
      setPoliceOfficerName(userResponse.data.hits.hits[0]._source.name);
      setOfficerDesig(userResponse.data.hits.hits[0]._source.role);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export function getActSection(setAIIPCSections, setActSectionProgress, description) {
  setActSectionProgress(true);

  const text = {
    text: description
  }

  axios
    .post(`${baseUrls.aiSectionsUrl}/sections`, text, {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then((res) => {
      setAIIPCSections(res.data);
      setActSectionProgress(false)
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getAICatagory(setCrimeCategories, setAICatagoryLoading, crimeCategories, description) {
  setAICatagoryLoading(true);

  const text = {
    text: description
  }

  axios
    .post(`${baseUrls.aiCatagoryUrl}/fir-categories`, text, {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then((res) => {
      let concatenatedArray = crimeCategories.concat(res.data.predicted_class);
      let uniqueArray = concatenatedArray.filter((item, index) => {
        return concatenatedArray.indexOf(item) === index;
      });

      setCrimeCategories(uniqueArray)
      setAICatagoryLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function addFirFunc(firData, setDialogOpen, setBackdropOpen) {
  axios
    .post(`${baseUrls.backEndUrl}/police-admin/fir/manage/add-fir`, firData, {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then((res) => {
      setBackdropOpen(false);
      setDialogOpen(true);
    })
    .catch((err) => {
      console.log(err);
      setBackdropOpen(false);
    });
}