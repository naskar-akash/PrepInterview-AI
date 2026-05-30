from ..utils.gentoken import generate_token
from flask import jsonify, request, session
from ..models.user_model import User
from ..db import SessionLocal
import bcrypt
from flask import make_response

def signup():
    db = SessionLocal()
    try:
        # getting data from request
        data = request.get_json(silent=True)
        if not data:
            return jsonify({"message": "Invalid or missing JSON body"}), 400
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        age = data.get('age')
        gender = data.get('gender')
        
        # checking if user already exists
        existing_user = db.query(User).filter((User.username == username) | (User.email == email)).first()
        if existing_user:
            return jsonify({"message": "User with this username or email already exists. Login please!"}), 400
        # creating new user
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        new_user = User(username=username, email=email, password=hashed_password, age=age, gender=gender)
        db.add(new_user)
        db.commit()
        return jsonify({"message": "User created successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()


def login():
    db = SessionLocal()
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # finding user by email
        user = db.query(User).filter(User.email == email).first()
        if not user:
            return jsonify({"message": "Invalid email or password"}), 401

        # checking password
        is_correct = bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8'))
        if not is_correct:
            return jsonify({"message": "Invalid email or password"}), 401

        token = generate_token(user.id)
        if not token:
            return jsonify({"message": "Error generating authentication token"}), 500
        
        response = make_response(jsonify({"message": "Login successful!"}))

        # store token in cookie
        response.set_cookie(
            "token",
            token,
            httponly=True,
            secure=False,      # True in production HTTPS
            samesite="Lax",    # None in production                         
            max_age=60*60*24   # 1 day
        )
        return response, 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()


def get_user():
    db = SessionLocal()
    try:
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({"message": "Unauthorised"}), 401

        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            return jsonify({"message": "User not found"}), 404

        return jsonify({
            "username": user.username,
            "email": user.email,
            "age": user.age,
            "gender": user.gender
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()