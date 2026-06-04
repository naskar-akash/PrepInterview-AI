from flask import jsonify

def get_current_user(cur_user):
    return jsonify({
        "success": True,
        "user": {
            "id": cur_user.id,
            "name": cur_user.name,
            "email": cur_user.email,
            "profile_pic": cur_user.profile_pic,
            "credits": cur_user.credits,
            "created_at": cur_user.created_at
        }
    }), 200