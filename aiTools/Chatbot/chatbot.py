from transformers import pipeline
from huggingface_hub import hf_hub_download
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from fastapi import FastAPI, HTTPException, Request
from g_translate import translate, translate_to_en
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import uvicorn
import requests
import json
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain.prompts import PromptTemplate
from langchain_community.llms import LlamaCpp
from langchain.chains import RetrievalQA
from langchain.cache import InMemoryCache
from langchain.globals import set_llm_cache
from twilio.rest import Client

class Data(BaseModel):
    text: str

# class Message(BaseModel):
#     Body: str
#     From: str
#     to: str

account_sid = '*******'
auth_token = '******'
client = Client(account_sid, auth_token)

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2", model_kwargs={"device": "cpu"}, encode_kwargs={'normalize_embeddings': False})
db = FAISS.load_local(folder_path="./GGUFfaiss_db",embeddings=embeddings, index_name="myGGUFIndex", allow_dangerous_deserialization = True)

FIR_searcher = pipeline("question-answering", model="deepset/roberta-base-squad2")
model_name = "microsoft/Phi-3-mini-4k-instruct-gguf"
model_file = "Phi-3-mini-4k-instruct-q4.gguf"
model_path = hf_hub_download(model_name, filename=model_file)
# local_llm = "./gguf try 1/Phi-3-mini-4k-instruct-q4.gguf"
set_llm_cache(InMemoryCache())
llm = LlamaCpp(
    cache= True,
    model_path= model_path,
    temperature=0.5,
    # n_gpu_layers=8,
    max_tokens=512,
    n_ctx=512,
    n_threads = 8,
    use_mlock = True,
    use_mmap = True
)
prompt_template = """Use the following pieces of information to answer the user's question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Context: {context}
Question: {question}

Only return the helpful answer. Answer must be very concise.
"""
prompt = PromptTemplate(template=prompt_template, input_variables=['context', 'question'])
retriever = db.as_retriever(search_kwargs={"k":1})
chain_type_kwargs = {"prompt": prompt}
qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever, chain_type_kwargs=chain_type_kwargs, verbose=True)

FIR = ["fir id", "firid", "id", "fir i'd"]
def rabin_karp(text, pattern):
    if len(pattern) > len(text):
        return -1
    pattern_hash = hash(pattern)
    text_hash = hash(text[:len(pattern)])
    for i in range(len(text) - len(pattern) + 1):
        if text_hash == pattern_hash and text[i:i+len(pattern)] == pattern:
            return i
        if i < len(text) - len(pattern):
            text_hash = hash(text[i+1:i+len(pattern)+1])

    return -1

def not_negative(lst):
    for num in lst:
        if num > -1:
            return True
    return False

def sendMessage(sender_id, message):

    res = client.messages.create(
        body=message,
        from_='whatsapp:+*******',
        to=sender_id
    )
    return res

def fetch(message):
    check = []
    user_message = message.lower()
    for fir in FIR:
        check.append(rabin_karp(user_message, fir))
    if not_negative(check) == True:
        rese = FIR_searcher(question="What is my FIR ID", context=user_message)
        r = rese['answer']
        re = requests.get(f'https://*****/query/get?id={r}')
        resp = json.loads(re.text)
        if resp['complainantName'] == None:
            res = f"No FIR was found with the ID - {r}. Please enter a valid FIR ID to get the case updates."
        else:
            res = f"This FIR was registered by {resp['complainantName']}. The last update of this FIR is \"{resp['lastUpdateDescription']}\". The status of this FIR is \"{resp['status']}\"."
    else:
        res = "Please enter the FIR ID to get the case updates."
    return res

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def generate_response(data:Data):
    check = []
    user_message, lang = translate_to_en(data.text)
    # print(translate_to_en(data.text))
    for fir in FIR:
        check.append(rabin_karp(user_message, fir))
    if not_negative(check) == True:
        rese = FIR_searcher(question="What is my FIR ID", context=user_message)
        # res = translate(rese, lang)
        # res = rese['answer']
        r = rese['answer']
        re = requests.get(f'https://*****/fir-management/query/get?id={r}')
        res = json.loads(re.text)
    else:
        response = qa(user_message)
        rese = response['result']
        rese = rese[13:].strip()
        res = {"Response" : translate(rese, lang)}
    return JSONResponse(content=jsonable_encoder(res), status_code=200)

@app.post('/whatsapp')
async def whatsapp(request:Request):
    form_data = await request.form()
    data = {}
    for key, value in form_data.items():
        data[key] = value
    # print(data)
    body, lang = translate_to_en(data['Body'])
    sender = data['From']
    print(body, sender)
    mess = fetch(body)
    message = mess
    sender_id = sender.split('+')[1]
    print(f'Message --> {message}')
    print(f'Sender id --> {sender_id}')
    res = sendMessage(sender_id=sender, message=message)
    print(f'This is the response --> {res}')
    # body, lang = translate_to_en(request.Body)
    # sender = request.From
    # print(body, sender)
    # mess = fetch(body)
    # message = translate(mess,lang)
    # sender_id = sender.split('+')[1]
    # print(f'Message --> {message}')
    # print(f'Sender id --> {sender_id}')
    # res = sendMessage(sender_id=sender_id, message=message)
    # print(f'This is the response --> {res}')
    return '200'

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5004)
    #uvicorn chatbot:app --reload
