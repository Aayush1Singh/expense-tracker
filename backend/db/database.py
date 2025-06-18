from mongoengine import connect
from pymongo import MongoClient
from dotenv import load_dotenv
import os
load_dotenv()
connect(host=os.getenv("MONGO_URI"),tls=True,
    tlsAllowInvalidCertificates=True,
    alias="default")
mongo_url = os.getenv("DB_URI", "mongodb://localhost:27017")
client=MongoClient(mongo_url)
db=client['civic-eye']

