from ..models.resume_model import Resume
from ..db import SessionLocal
from ..utils.resume_parser import extract_resume_sections
import os
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
        resume_data = extract_resume_sections(file_path)

        interview_questions = askAi(f"Based on the following resume data, please prepare 5 interview questions:\n\n{resume_data}")

        new_resume = Resume(
            user_id=user_id,
            resume_title=filename,
            filepath=file_path,
            extracted_skills=resume_data["skills"],
            extracted_education=resume_data["education"],
            extracted_projects=resume_data["projects"],
            extracted_experience=resume_data["experience"]
        )
        db.add(new_resume)
        db.commit()
        # delete file only after everything succeeds
        if os.path.exists(file_path):
            os.remove(file_path)

        return {
            "message": "Resume uploaded successfully",
            "interview_questions": interview_questions
        }, 200
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        db.close()