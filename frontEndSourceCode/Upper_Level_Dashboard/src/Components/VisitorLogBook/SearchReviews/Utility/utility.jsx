import axios from "axios";
import { baseUrls } from "../../../../GlobalConfig/config";


export const openDialouge = async (data, setDialouge, setVisitorName, setVisitorEmail, setVisitorPhone, setVisitorAddress, setVisitingTime) => {
  setDialouge(true);
  try {
    const response = await axios.get(`${baseUrls.backEndUrl}/police-admin/visitors/get/${data.visiting_time_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setVisitorName(response.data.visitorName)
    setVisitorEmail(response.data.visitorEmail)
    setVisitorPhone(response.data.visitorPhone)
    setVisitorAddress(response.data.visitorAddress)
    const visitingTime = new Date(response.data.visitDateTime)
    setVisitingTime(visitingTime.toLocaleString())

  } catch (error) {
    console.error('Error:', error);
  }
}

