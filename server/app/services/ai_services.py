from dotenv import load_dotenv
import os
from openai import OpenAI
from flask import jsonify


load_dotenv()

def askAi(message):
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    try:
        response = client.responses.create(
            model="gpt-4o-mini",
            input=[
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": message
            }
        ]
        )
        content = response.output_text
        if not content or content.strip() == "":
            return jsonify({"error": "AI did not return a valid response"}), 500
        return jsonify({"response": content}), 200
    except Exception as e:
        return jsonify({"OPENAI error": str(e)}), 500
