from dotenv import load_dotenv
import os
from openai import OpenAI
from flask import jsonify
import json


load_dotenv()

def askAi(message):
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    try:
        response = client.responses.create(
            model="gpt-4o-mini",
            input=[
            {
                "role": "system",
                "content": """
                Extract structured data from resume.

                Return strictly JSON:
                {
                    "role": "string",
                    "experience": "string",
                    "education": "string",
                    "projects": ["project1","project2",...],
                    "skills": ["skill1","skill2",...]
                }
                """
            },
            {
                "role": "user",
                "content": message
            }
        ],
        text={
            "format": {
                    "type": "json_object"
                }
            }
        )
        content = response.output_text
        if not content or content.strip() == "":
            return jsonify({"error": "AI did not return a valid response"}), 500
        return json.loads(content)
    except Exception as e:
        return jsonify({"OPENAI error": str(e)}), 500
    