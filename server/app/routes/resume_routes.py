from flask import Blueprint, request, jsonify
from ..controller.resume_controller import upload_resume
from ..middleware.is_auth import is_auth

resume_bp = Blueprint('resume', __name__, url_prefix='/resume')

@resume_bp.route('/', methods=['GET'])
def get_resume():
    pass

@resume_bp.route('/upload', methods=['POST'])
@is_auth
def upload_resume_route(cur_user=None):
    file = request.files.get('file')
    response, status_code = upload_resume(file, cur_user.id)
    return jsonify(response), status_code
    


@resume_bp.route('/delete/<int:id>', methods=['DELETE'])
@is_auth
def delete_resume(id, cur_user=None):
    pass