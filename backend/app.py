from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from together import Together
load_dotenv()

app = Flask(__name__)
CORS(app)

# Together.ai
together_client = Together(api_key=os.environ.get("TOGETHER_KEY"))
# Mongo
mongo_client = MongoClient(os.environ.get("MONGO_URL"))
db = mongo_client.ClassCompanion
sessions_collection = db.sessions

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

if __name__ == "__main__":
    app.run()