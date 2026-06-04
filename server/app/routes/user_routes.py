from flask import  Blueprint
from ..controller.user_controller import get_current_user
from ..middleware.is_auth import is_auth


user_bp = Blueprint('user', __name__, url_prefix='/user')

# Route to get current user info
@user_bp.route('/current_user', methods=['GET'])
@is_auth
def get_cur_user_route(cur_user=None):
    return get_current_user(cur_user)