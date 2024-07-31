from flask import Flask, request
import re
import urllib
import requests
import json
from flask_cors import CORS
app = Flask(__name__)

CORS(app,origins="*")

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

    data = requests.get("https://******/visiting_times/_search",json=req_data,auth=("*****","*****@"))
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


def send_review(review):
    data = requests.post("https://******/review/save",json=review)
    return data.json()
@app.route('/sms-webhook', methods=['POST'])
def handle_sms():
    data = request.get_data(as_text=True)  # Extract incoming SMS data
    print(data)
    data = urllib.parse.parse_qs(data)
    from_number = data.get("sender")
    content = data.get("content")[0]
    keyword = data.get("keyword")
    review = get_visiting_time(from_number)
    if review:
        review["review"] = content[6:]
        review["rating"] = 0
        print(review)
        response  = send_review(review)
        print(response)
    # print("user does not exists")
    print(from_number,content,keyword)  # Process the received SMS data
    return 'OK'  # Return a response to Textlocal


    s


if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port=5005)