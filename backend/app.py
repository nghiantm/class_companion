from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pydantic import BaseModel, Field
from typing import List
#from together import Together
load_dotenv()

app = Flask(__name__)
CORS(app)

# Together.ai
together_client = OpenAI(api_key=os.getenv("TOGETHER_API_KEY"), base_url=os.getenv("BASE_URL"))
# Define the schema for the output.
class User(BaseModel):
    questions: List[str] = Field(
        description="List of questions from 1 to 6"
    )

#client = OpenAI(api_key=os.getenv("TOGETHER_API_KEY"), base_url=os.getenv("BASE_URL"))
# Mongo
mongo_client = MongoClient(os.environ.get("MONGO_URL"))
db = mongo_client.ClassCompanion
ekko_db = mongo_client.RealTalk
sessions_collection = db.sessions
chats_collection = ekko_db.chats

@app.route("/sessions", methods=["GET"])
def get_sessions():
    try:
        user_email = request.args.get("email")
        cursor = sessions_collection.find({ "email": user_email })

        documents = []
        for document in cursor:
            document['_id'] = str(document['_id'])
            documents.append(document)

        return jsonify(documents), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/session", methods=["GET"])
def get_one_session():
    try:
        user_email = request.args.get("email")
        name = request.args.get("name")
        desc = request.args.get("description")
        session_document = sessions_collection.find_one({
            "email": user_email,
            "name": name,
            "description": desc
        })

        if session_document:
            # Convert ObjectId to string for JSON serialization
            session_document['_id'] = str(session_document['_id'])
            return jsonify(session_document), 200
        else:
            return jsonify({"error": "Session not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/sessions", methods=["POST"])
def post_session():
    try:
        data = request.get_json()
        email = data.get("email")
        name = data.get("name")
        # Extract optional fields
        desc = data.get("description", "")
        summary = data.get("summary", "")
        transcript = data.get("transcript", "")

        data = {
            "email": email,
            "name": name,
            "description": desc,
            "summary": summary,
            "transcript": transcript
        }
        query = { "email": email, "name": name }
        update_operation = {"$set": data}
        sessions_collection.update_one(query, update_operation, upsert=True)

        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/generate_response", methods=["POST"])
def generate_response():
    try:
        data = request.get_json()
        messages = data["messages"]

        response = together_client.chat.completions.create(
            messages=messages,
            #response_format={"type": "json_object", "schema": User.model_json_schema()},
            temperature=1,
            model="NousResearch/Nous-Hermes-2-Yi-34B"
            #model="mistralai/Mixtral-8x7B-v0.1"
        )

        responseJSON = {
            "role": response.choices[0].message.role,
            "content": response.choices[0].message.content
        }

        return jsonify(responseJSON), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/summarize", methods=["POST"])
def summarize():
    try:
        data = request.get_json()
        messages = data["messages"]

        response = together_client.chat.completions.create(
            messages=messages,
            #response_format={"type": "json_object", "schema": User.model_json_schema()},
            temperature=0.2,
            model="NousResearch/Nous-Hermes-2-Yi-34B"
            #model="mistralai/Mixtral-8x7B-v0.1"
        )

        responseJSON = {
            "role": response.choices[0].message.role,
            "content": response.choices[0].message.content
        }

        return jsonify(responseJSON), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/chats", methods=["GET"])
def get_chats():
    try:
        email = request.args.get("email")
        query = { "email": email }

        chats = chats_collection.find_one(query)

        if chats:
            # Remove the "_id" field for JSON serialization (if needed)
            chats.pop("_id", None)
            return jsonify(chats), 200
        else:
            return jsonify(chats), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/chats", methods=["POST"])
def post_chats():
    try:
        # Extract data from the request body
        data = request.get_json()
        email = data.get("email")
        messages = data.get("messages")

        # Prepare the query to find the chat document by email
        query = {"email": email}

        # Prepare the $set operation based on fields present in the request body
        update = {}
        if messages is not None:
            update["messages"] = messages

        # Specify options for the update operation (upsert: true)
        options = {"upsert": True}

        # Execute the update operation
        result = chats_collection.update_one(query, {"$set": update}, **options)

        if result.upserted_id:
            # If a new document was inserted, return insertedId
            inserted_id = str(result.upserted_id)
            return jsonify({"insertedId": inserted_id}), 201
        else:
            # If an existing document was updated, return success message
            return jsonify({"message": "Chat updated successfully"}), 200

    except Exception as e:
        print("Failed to insert or update chat:", e)
        return jsonify({"error": "Failed to insert or update chat"}), 500

if __name__ == "__main__":
    app.run()