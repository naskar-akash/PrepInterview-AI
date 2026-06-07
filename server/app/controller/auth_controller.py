import traceback
from ..utils.gentoken import decode_token, generate_token
from flask import jsonify, request, session
from ..models.user_model import User
from ..db import SessionLocal
from flask import make_response


def google_auth():
    db = SessionLocal()
    try:
        data = request.get_json()

        name = data.get('name')
        email = data.get('email')
        profile_pic = data.get('profile_pic')

        cur_user = db.query(User).filter(User.email == email).first()
        if not cur_user:
            cur_user = User(name=name, email=email, profile_pic=profile_pic)
            db.add(cur_user)
            db.commit()
            db.refresh(cur_user)
            token = generate_token(cur_user.id)
            response = make_response(jsonify({
                "message": "User created successfully",
                "success": True,
                "user": {
                    "id": cur_user.id,
                    "name": cur_user.name,
                    "email": cur_user.email,
                    "profile_pic": cur_user.profile_pic
                }
            }))
            # store token in cookie
            response.set_cookie(
                "token",
                token,
                httponly=True,
                secure=False,     
                samesite="Lax",                           
                max_age=60*60*24*7  
            )
            return response, 200
        else:
            token = generate_token(cur_user.id)
            response = make_response(jsonify({
                "message": "User logged in successfully",
                "success": True,
                "user": {
                    "id": cur_user.id,
                    "name": cur_user.name,
                    "email": cur_user.email,
                    "profile_pic": cur_user.profile_pic
                }
            }))
            # store token in cookie
            response.set_cookie(
                "token",
                token,
                httponly=True,
                secure=False,     
                samesite="Lax",                           
                max_age=60*60*24*7  
            )
            return response, 200
        
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()


def logout(cur_user=None):
    try:
        response = make_response(
        jsonify({
            "success": True,
            "message": "Logged out successfully"
        }))

        response.delete_cookie(
            "token",
            httponly=True,
            secure=True,
            samesite="None"
        )

        return response, 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    