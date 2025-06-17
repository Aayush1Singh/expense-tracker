from mongoengine import connect
from dotenv import load_dotenv
import os
load_dotenv()
connect(host=os.getenv("MONGO_URI"),tls=True,
    tlsAllowInvalidCertificates=True,
    alias="default")
