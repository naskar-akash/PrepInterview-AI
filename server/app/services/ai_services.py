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
                "content": """
                Go through the uploaded data of a certain resume. 
                Then based on the data prepare 5 interview questions on the desired role and experience.
                5 questions should be easy to medium to hard in difficulty.

                Return the questions in a JSON format as follows:
                {
                    "questions": [
                        {
                            "question": "question 1",
                            "difficulty": "easy"
                        },
                        {
                            "question": "question 2",
                            "difficulty": "easy to medium"
                        },
                        {
                            "question": "question 3",
                            "difficulty": "medium"
                        },
                        {
                            "question": "question 4",
                            "difficulty": "medium to hard"
                        },
                        {
                            "question": "question 5",
                            "difficulty": "hard"
                        }
                    ]
                }
                """
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
