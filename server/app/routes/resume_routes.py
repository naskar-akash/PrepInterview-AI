from flask import Flask, Blueprint

resume_bp = Blueprint('resume', __name__, url_prefix='/resume')

@resume_bp.route('/', methods=['GET'])
def get_resume():
    return {"message": "Get resume details"}

@resume_bp.route('/upload', methods=['POST'])
def upload_resume():
    return {"message": "Resume uploaded successfully"}

@resume_bp.route('/update', methods=['PUT'])
def update_resume():
    return {"message": "Resume updated successfully"}

@resume_bp.route('/delete', methods=['DELETE'])
def delete_resume():
    return {"message": "Resume deleted successfully"}