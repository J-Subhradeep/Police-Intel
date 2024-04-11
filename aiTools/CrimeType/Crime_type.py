import numpy as np
import torch
from googletrans import Translator
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import py_eureka_client.eureka_client as eureka_client

eureka_client.init(eureka_server="http://77.37.44.176:8761/eureka",
                   app_name="FIR-CATEGORIES-ANALYSIS-SERVICE",
                   instance_host="77.37.44.176",
                   instance_port=5003)

class Data(BaseModel):
    text: str

tokenizer = AutoTokenizer.from_pretrained("Luna-Skywalker/BERT-crime-analysis")
model = AutoModelForSequenceClassification.from_pretrained("Luna-Skywalker/BERT-crime-analysis")

id2label = {0: 'ARSON', 1: 'ASSAULT', 2: 'BATTERY', 3: 'BURGLARY',
            4: 'CONCEALED CARRY LICENSE VIOLATION', 5: 'CRIM SEXUAL ASSAULT', 6: 'CRIMINAL DAMAGE', 
            7: 'CRIMINAL TRESPASS', 8: 'DECEPTIVE PRACTICE', 9: 'DOMESTIC VIOLENCE', 
            10: 'GAMBLING', 11: 'HOMICIDE', 12: 'HUMAN TRAFFICKING', 
            13: 'INTERFERENCE WITH PUBLIC OFFICER', 14: 'INTIMIDATION', 15: 'KIDNAPPING', 
            16: 'LIQUOR LAW VIOLATION', 17: 'MOTOR VEHICLE THEFT', 18: 'NARCOTICS', 
            19: 'NON-CRIMINAL', 20: 'NON-CRIMINAL (SUBJECT SPECIFIED)', 21: 'OBSCENITY', 
            22: 'OFFENSE INVOLVING CHILDREN', 23: 'OTHER NARCOTIC VIOLATION', 24: 'OTHER OFFENSE', 
            25: 'PROSTITUTION', 26: 'PUBLIC INDECENCY', 27: 'PUBLIC PEACE VIOLATION', 
            28: 'RITUALISM', 29: 'ROBBERY', 30: 'SEX OFFENSE', 31: 'STALKING', 32: 'THEFT', 33: 'WEAPONS VIOLATION'}

def translate_to_en(text):
    lang = 'en'
    translator = Translator()

    lang = translator.detect(text).lang
    # print(lang)

    english_translated_text = translator.translate(text, src=lang, dest= 'en')
    # print(english_translated_text)

    # print(f"English Translation: {english_translated_text.text}")
    return english_translated_text.text

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/fir-categories")
async def get_crime_type(data:Data):
    text = translate_to_en(data.text)
    inputs = tokenizer(text, return_tensors="pt")
    inputs = {k: v.to(model.device) for k,v in inputs.items()}
    outputs = model(**inputs)
    logits = outputs.logits
    sigmoid = torch.nn.Sigmoid()
    probs = sigmoid(logits.squeeze().cpu())
    predictions = np.zeros(probs.shape)
    predictions[np.where(probs >= 0.95)] = 1
    predicted_labels = [id2label[idx] for idx, label in enumerate(predictions) if label == 1.0]
    return JSONResponse(content=jsonable_encoder({"predicted_class": predicted_labels}), status_code=200)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5003)
    #uvicorn Crime_type:app --reload
