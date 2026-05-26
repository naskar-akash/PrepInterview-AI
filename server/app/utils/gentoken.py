import bcrypt
import jwt
import datetime
import os
from dotenv import load_dotenv

load_dotenv()
secret_key = os.getenv('SECRET_KEY')

def generate_token(user_id):
    try:
        token = jwt.encode({
            "user_id": user_id,
            "exp": datetime.datetime.now() + datetime.timedelta(days=1)
            },
            secret_key, 
            algorithm="HS256")
        return token
    except Exception as e:
        print(f"Error generating token: {str(e)}")
        return None