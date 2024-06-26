# -*- coding: utf-8 -*-
import certifi
import os
import urllib.parse

from pydantic import BaseModel

from dotenv import load_dotenv
from pymongo import MongoClient
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores.qdrant import Qdrant
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

load_dotenv(os.path.join(os.path.dirname(__file__), ".env.example"))


class Constants:
    MONGODB_URI = "mongodb+srv://mylittlehusky2004:PDanii@279197.@cluster0.cbgkxvv.mongodb.net/"
    OPENAI_API_KEY = "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"

    parsed_uri = urllib.parse.urlparse(MONGODB_URI)
    encoded_uri = MONGODB_URI.replace(
        parsed_uri.username, urllib.parse.quote_plus(parsed_uri.username)
    )
    encoded_uri = encoded_uri.replace(
        parsed_uri.password, urllib.parse.quote_plus(parsed_uri.password)
    )
    # Create MongoDB client
    client = MongoClient(host=encoded_uri, tlsCAFile=certifi.where(), tls=True)

    # Get the database
    db = client.get_database("Cluster0")

    # Get collections
    RESUME_INFO = db.get_collection("RESUME_INFO")
    RESUME_ANALYSIS = db.get_collection("RESUME_ANALYSIS")
    USERS = db.get_collection("USERS")
    USER_TOKENS = db.get_collection("USER_TOKENS")
    CURRENT_OPENING_JOB = db.get_collection("JOB_INFO")
    CANDIDATE_EXPERIENCE = db.get_collection("CANDIDATE_EXPERIENCE")
    ROLE_ROADMAP = db.get_collection("ROADMAP_INFO")
    INTERVIEW_QA = db.get_collection("INTERVIEW_QA")
    MOCK_INTERVIEW = db.get_collection("MOCK_INTERVIEW")

    # Initialize OpenAI model
    EMBEDDING_FUNC = OpenAIEmbeddings(model="text-embedding-3-large", openai_api_key="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")

    CHAT_MODEL = ChatOpenAI(
        model_name="gpt-4-0125-preview",
        temperature=0.1,
        openai_api_key=OPENAI_API_KEY,
        callbacks=[StreamingStdOutCallbackHandler()],
        streaming=True,
    )


# Define Message class
class Message(BaseModel):
    message: str
