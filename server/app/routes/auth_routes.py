from flask import jsonify, Blueprint, request, session
from ..models.user_model import User
from ..db import SessionLocal
import bcrypt


auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

# Route to get user info (for testing purposes)
@auth_bp.route('/profile', methods=['GET'])
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

# Route to handle user signup
@auth_bp.route('/signup', methods=['POST'])
def signup():
    db = SessionLocal()
    try:
        # getting data from request
        data = request.get_json()
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

# Route to handle user login
@auth_bp.route('/login', methods=['POST'])
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
        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return jsonify({"message": "Invalid email or password"}), 401

        session['user_id'] = user.id
        return jsonify({"message": "Login successful!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

# Route to handle user logout
@auth_bp.route('/logout', methods=['POST'])
def logout():
    try:
        session.pop('user_id', None)
        return jsonify({"message": "Logout successful!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

