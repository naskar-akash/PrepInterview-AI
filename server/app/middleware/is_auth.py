from functools import wraps
from flask import request, jsonify
from ..models.user_model import User
from ..utils.gentoken import decode_token
from ..db import SessionLocal

def is_auth(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.cookies.get('token')
        if not token:
            return jsonify({"error": "Unauthorized"}), 401
        
        user_id = decode_token(token)
        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401
        
        db = SessionLocal()
        try:
            cur_user = db.query(User).filter(User.id == user_id).first()

            if not cur_user:
                return jsonify({"error": "Unauthorized"}), 401

            return func(cur_user=cur_user, *args, **kwargs)

        finally:
            db.close()
    return wrapper