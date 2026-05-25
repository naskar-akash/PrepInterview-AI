from flask import Flask, Blueprint, jsonify, request, session
from ..models.resume_model import Resume
from ..db import SessionLocal
from ..utils.resume_parser import extract_resume_sections
import os

resume_bp = Blueprint('resume', __name__, url_prefix='/resume')

@resume_bp.route('/', methods=['GET'])
def get_resume():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"message": "Unauthorised"}), 401
    db = SessionLocal()
    try:
        resumes = db.query(Resume).filter(Resume.user_id == user_id).all()
        resume_list = []
        for resume in resumes:
            resume_list.append({
                "id": resume.id,
                "resume_title": resume.resume_title,
                "extracted_skills": resume.extracted_skills,
                "extracted_education": resume.extracted_education,
                "extracted_projects": resume.extracted_projects,
                "extracted_experience": resume.extracted_experience
            })
            return jsonify(resume_list), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

@resume_bp.route('/upload', methods=['POST'])
def upload_resume():
    db = SessionLocal()
    try:
        session_user_id = session.get('user_id')
        if not session_user_id:
            return jsonify({"message": "Unauthorized"}), 401
        file = request.files.get("resume")
        if not file:
            return jsonify({"message": "No file uploaded"}), 400
        upload_folder = "uploads/"
        os.makedirs(upload_folder, exist_ok=True)
        file_path = os.path.join(upload_folder, file.filename)
        file.save(file_path)
        resume_data = extract_resume_sections(file_path)

        new_resume = Resume(
            user_id=session_user_id,
            resume_title=file.filename,
            filepath=file_path,
            extracted_skills=resume_data["skills"],
            extracted_education=resume_data["education"],
            extracted_projects=resume_data["projects"],
            extracted_experience=resume_data["experience"]
        )
        db.add(new_resume)
        db.commit()
        db.refresh(new_resume)
        return jsonify({
            "message": "Resume uploaded and processed successfully",
            "resume_id": new_resume.id
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()


@resume_bp.route('/delete/<int:id>', methods=['DELETE'])
def delete_resume(id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401
    db = SessionLocal()
    try:
        resume = db.query(Resume).filter(Resume.id == id, Resume.user_id == user_id).first()
        if not resume:
            return jsonify({"message": "Resume not found"}), 404
        if os.path.exists(resume.filepath):
            os.remove(resume.filepath)
        db.delete(resume)
        db.commit()
        return jsonify({"message": "Resume deleted successfully"}), 201
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()