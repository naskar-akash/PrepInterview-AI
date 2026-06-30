from flask import Blueprint, request, jsonify
from ..controller.interview_controller import upload_resume
from ..middleware.is_auth import is_auth

interview_bp = Blueprint('interview', __name__, url_prefix='/interview')

@interview_bp.route('/', methods=['GET'])
def get_interview():
    pass

@interview_bp.route('/upload', methods=['POST'])
@is_auth
def upload_resume_route(cur_user=None):
    file = request.files.get('resume')
    response, status_code = upload_resume(file, cur_user.id)
    return response, status_code
    


@interview_bp.route('/delete/<int:id>', methods=['DELETE'])
@is_auth
def delete_resume(id, cur_user=None):
    pass