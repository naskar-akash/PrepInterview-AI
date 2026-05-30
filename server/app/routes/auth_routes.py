from flask import  Blueprint
from ..controller.auth_controller import signup, login, get_user


auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

# Route to get user info (for testing purposes)
@auth_bp.route('/profile', methods=['GET'])
def get_user():
    pass

# Route to handle user signup
@auth_bp.route('/signup', methods=['POST'])
def signup():
    pass

# Route to handle user login
@auth_bp.route('/login', methods=['POST'])
def login():
    pass


# Route to handle user logout
@auth_bp.route('/logout', methods=['POST'])
def logout():
    pass


