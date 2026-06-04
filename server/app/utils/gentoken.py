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
            "exp": datetime.datetime.now() + datetime.timedelta(days=3)
            },
            secret_key, 
            algorithm="HS256")
        return token
    except Exception as e:
        print(f"Error generating token: {str(e)}")
        return None
    
def decode_token(token):
    try:
        decoded = jwt.decode(token, secret_key, algorithms=["HS256"])
        return decoded.get("user_id")
    except jwt.ExpiredSignatureError:
        print("Token has expired")
        return None
    except jwt.InvalidTokenError:
        print("Invalid token")
        return None