from flask import jsonify
from ..models.interview_model import Resume
from ..db import SessionLocal
from ..utils.resume_parser import extract_text_from_pdf
import os
import json
from datetime import datetime
from ..utils.allowed_file import allowed_file
from werkzeug.utils import secure_filename
from ..services.ai_services import askAi


def upload_resume(file, user_id):
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    db = SessionLocal()
    try:
        if not user_id:
            return {"message": "Unauthorized"}, 401
        if not file:
            return {"message": "No file uploaded"}, 400
        if not allowed_file(file.filename):
            return {"message": "Invalid file type"}, 400
        upload_folder = os.path.join("app","public","uploads")
        os.makedirs(upload_folder, exist_ok=True)
        file_name = secure_filename(file.filename)
        filename = f"{user_id}_{timestamp}_{file_name}"
        file_path = os.path.join(upload_folder, filename)
        file.save(file_path)
        resume_text = extract_text_from_pdf(file_path)

        ai_response = askAi(resume_text)

        # new_resume = Resume(
        #     user_id=user_id,
        #     resume_title=filename,
        #     filepath=file_path,
        #     extracted_skills=json.dumps(ai_response["skills"]),
        #     extracted_education=ai_response["education"],
        #     extracted_projects=json.dumps(ai_response["projects"]),
        #     extracted_experience=ai_response["experience"]
        # )
        # db.add(new_resume)
        # db.commit()
        # delete file only after everything succeeds
        if os.path.exists(file_path):
            os.remove(file_path)

        return jsonify({
                "message": "Resume uploaded and processed successfully",
                "resume": {
                        "role": ai_response["role"],
                        "experience": ai_response["experience"],
                        "projects": ai_response["projects"],
                        "skills": ai_response["skills"]
                },
                "resume_text": resume_text
        }), 200
    except Exception as e:
        # delete file only after everything succeeds
        if os.path.exists(file_path):
            os.remove(file_path)
        return {"error": str(e)}, 500
    finally:
        db.close()