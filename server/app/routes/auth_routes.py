from flask import  Blueprint
from ..controller.auth_controller import google_auth, logout
from ..middleware.is_auth import is_auth


auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

# Route to handle user signup
@auth_bp.route('/google_auth', methods=['POST'])
def signup():
    return google_auth()


# Route to handle user logout
@auth_bp.route('/logout', methods=['POST'])
@is_auth
def logout(cur_user=None):
    return logout()


