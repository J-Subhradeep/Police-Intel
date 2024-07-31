import requests
import json

def get_visiting_time(visitor_phone):
    req_data = {
        "query": {
        "match": {
        "visitor_phone": "+"+visitor_phone[0]
        }
        
    },
    "sort": [
        {
        "visit_date_time": {
            "order": "desc"
        }
        }
    ],
    "size":1
    }

    data = requests.get("https://*****/visiting_times/_search",json=req_data,auth=("*****","*****"))
    data = data.json()
    data = data.get("hits").get("hits")
    if(data):
        data = data[0].get("_source")
        visiting_time_id = data.get("id")
        police_station_id = data.get("police_station_id")
        visitor_id = data.get("visitor_id")
        return {"visitorId": visitor_id,"visitingTimeId": visiting_time_id,"policeStationId": police_station_id}
    else:
        return None

