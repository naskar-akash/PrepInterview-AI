from flask import Blueprint, request, jsonify
from ..controller.interview_controller import upload_resume, generate_questions, submit_answer, finish_interview, get_all_interviews, get_interview_by_id, delete_interview
from ..middleware.is_auth import is_auth

interview_bp = Blueprint('interview', __name__, url_prefix='/interview')


@interview_bp.route('/upload', methods=['POST'])
@is_auth
def upload_resume_route(cur_user=None):
    file = request.files.get('resume')
    response, status_code = upload_resume(file, cur_user.id)
    return response, status_code
    

@interview_bp.route('/generate-questions', methods=['POST'])
@is_auth
def generate_questions_route(cur_user=None):
    data = request.get_json()
    role = data.get('role')
    experience = data.get('experience')
    mode = data.get('mode')
    projects = data.get('projects')  # Optional field
    skills = data.get('skills')  # Optional field
    resume_text = data.get('resume_text')  # Optional field

    response, status_code = generate_questions(role, experience, mode, projects, skills, resume_text, cur_user.id)
    return response, status_code

@interview_bp.route('/submit-answer', methods=['POST'])
@is_auth
def submit_answer_route(cur_user=None):
    data = request.get_json()
    interview_id = data.get('interview_id')
    question_id = data.get('question_id')
    answer = data.get('answer')
    time_taken = data.get('time_taken')

    response, status_code = submit_answer(interview_id, question_id, answer, time_taken)
    return response, status_code

@interview_bp.route('/finish-interview', methods=['POST'])
@is_auth
def finish_interview_route(cur_user=None):
    data = request.get_json()
    interview_id = data.get('interview_id')

    response, status_code = finish_interview(interview_id)
    return response, status_code

@interview_bp.route('/get-interviews', methods=['GET'])
@is_auth
def get_interviews(cur_user=None):
    response, status_code = get_all_interviews(cur_user.id)
    return response, status_code

@interview_bp.route('/get-report/<int:interview_id>', methods=['GET'])
@is_auth
def get_interview(interview_id,cur_user=None):
    response, status_code = get_interview_by_id(interview_id, cur_user.id)
    return response, status_code

@interview_bp.route('/delete-interview/<int:interview_id>', methods=['DELETE'])
@is_auth
def del_interview_route(interview_id, cur_user=None):
    response, status_code = delete_interview(interview_id,cur_user.id)
    return response, status_code
   
   