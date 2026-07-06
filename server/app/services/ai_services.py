import re
from dotenv import load_dotenv
import os
from openai import OpenAI
from flask import jsonify
import json


load_dotenv()

def askAi(message, expect_json):
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    try:
        response = client.responses.create(
            model="gpt-4o-mini",
            input= message
        )
        content = response.output_text
        content = re.sub(r"^```(?:json)?\s*", "", content)
        content = re.sub(r"\s*```$", "", content)
        if not content or content.strip() == "":
            return jsonify({"error": "AI did not return a valid response"}), 500
        return json.loads(content) if expect_json else content
    
    except Exception as e:
        print(e)
        return None
    
