import traceback
from flask import jsonify
from ..models.user_model import User
from ..models.interview_model import Interview, Question
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

        # prompt to be sent to ai model
        resume_field_message = [
            {
                "role": "system",
                "content": """
                Extract structured data from resume.

                Return strictly JSON:
                {
                    "role": "string",
                    "experience": "string",
                    "education": "string",
                    "projects": ["project1","project2",...],
                    "skills": ["skill1","skill2",...]
                }
                """
            },
            {
                "role": "user",
                "content": resume_text
            }
        ]
        ai_response = askAi(resume_field_message, expect_json=True)

        if not ai_response or not isinstance(ai_response, dict):
            os.remove(file_path)  # Clean up the uploaded file
            return {"message": "AI failed to extract resume fields."}, 500
        
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
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

def generate_questions(role, experience, mode, projects, skills, resume_text, user_id):
    db = SessionLocal()
    try:
        if not role or not experience or not mode:
            return jsonify({"message": "role, experience, and mode are required"}), 400
        role = role.strip()
        experience = experience.strip()
        mode = mode.strip()

        if not user_id:
            return {"message": "Unauthorized"}, 401
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            return {"message": "User not found"}, 404
        if (user.credits < 50):
            return {"message": "Not enough credits. Min 50 required."}, 403
        project_text = ", ".join(projects) if projects else "None"
        skill_text = ", ".join(skills) if skills else "None"
        safe_resume = resume_text.strip() if resume_text else "None"

        user_prompt = f"Role: {role}, Experience: {experience}, Interview Mode: {mode}, Projects: {project_text}, Skills: {skill_text}, Resume: {safe_resume}"
        if not user_prompt:
            return {"message": "No valid input provided"}, 400
        # prompt to be sent to ai model
        gen_question_message = [
        {
            "role": "system",
            "content": """
            You are a real human interviewer conducting a professional interview.
            Speak in simple, natural English as if you are directly talking to the candidate. 

            Generate exactly 5 questions.
            Strict rules:
            - Each questions must contain between 15 to 25 words.
            - Each question must be a single complete sentence.
            - Do not number them.
            - Do not add explanations.
            - Do not add extra text before or after.
            - One questions per line only.
            - Keep language simple and conversational.
            - Questions must feel realistic and practical.

            Difficulty progression:
            Question 1 - easy
            Question 2 - easy
            Question 3 - medium
            Question 4 - medium
            Question 5 - hard

            MUST FOLLOW:
            Make questions based on the candidate's ROLE, EXPERIENCE, INTERVIEW MODE, projects(if provided), skills(if provided) and resume(if provided).
    """
        },
        {
            "role": "user",
            "content": user_prompt
        }
    ]
        
        ai_questions = askAi(gen_question_message, expect_json=False)
        if ai_questions is None:
            return jsonify({"message": "AI request failed"}), 500
        questions_array = [q.strip() for q in ai_questions.splitlines() if q.strip()][:5]
        if len(questions_array) == 0:
            return {"message": "AI failed to generate questions."}, 500
        
        user.credits -= 50
        db.commit()
        db.refresh(user)

        new_interview = Interview(
            user_id=user_id,
            role=role,
            experience=experience,
            mode=mode,
            resume_text=safe_resume
        )
        new_interview.questions = [ 
            Question( 
                question=q, 
                difficulty=["easy", "easy", "medium", "medium", "hard"][idx], 
                timelimit=[60, 60, 90, 90, 120][idx] 
                ) for idx, q in enumerate(questions_array) 
            ]
        db.add(new_interview)
        db.commit()
        db.refresh(new_interview)

        return jsonify({
            "message": "Questions generated successfully",
            "interview_id": new_interview.id,
            "credits_left": user.credits,
            "username": user.name,
            "questions": [
                    {
                        "id": q.id,
                        "question": q.question,
                        "difficulty": q.difficulty,
                        "timelimit": q.timelimit
                    }
                for q in new_interview.questions
        ]
        }), 200


    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

def submit_answer(interview_id, question_id, answer, time_taken):
    db = SessionLocal()
    try:
        interview = db.query(Interview).filter(Interview.id == interview_id).first()
        question = interview.questions[question_id] if interview else None
        
        # If no answer is submitted
        if not answer:
            question.score = 0
            question.feedback = "You did not provide an answer."
            question.answer = ""
            db.commit()
            return jsonify({"feedback": question.feedback}), 200
        # If time exceeded
        elif time_taken > question.timelimit:
            question.score = 0
            question.feedback = "Time exceeded. Answer will not be considered."
            question.answer = answer
            db.commit()
            return jsonify({"feedback": question.feedback}), 200
        else:
            # prompt to be sent to ai
            answered_message = [
        {
            "role": "system",
            "content": """
            You are a real human interviewer evaluating a candidate's answer in a real interview.
            Evaluate naturally and fairly, like a real person would. 

            Score the answer in these areas( 0 to 10):

            Strict rules:
            1. Confidence - Does the answer sound clear, confident and well-presented?
            2. Communication - Is the language simple, clear and easy to understand?
            3. Correctness - Is the answer accurate, relevent and complete?

            STRICT RULES:
            - Be realistic and unbiased.
            - Do not give random high scores.
            - If the answer is weak, score low.
            - If the answer is strong and detailed, score high.
            - Consider clarity, structure and relevance.

            CALCULATE:
            finalscore = average of confidence, communication and correctness (rounded to nearest whole number).

            Feedback rules:
            - Write natural human feedback
            - 10 to 15 words only.
            - Sounds like real interview feedback.
            - Can suggest improvement if needed.
            - Do NOT repeat the question.
            - Do NOT explain scoring.
            - Keep tone professional and honest.

            Return ONLY valid JSON in this format:
            {
              "confidence" : number,
              "communication" : number,
              "correctness" : number,
              "finalscore" : number,
              "feedback" : "short human feedback"
            }
    """
        },
        {
            "role": "user",
            "content": """
                        Questtion: {question.question}
                        Answer: {answer}
    """
        }
    ]

            ai_response = askAi(answered_message)
            if not ai_response or not ai_response.strip():
                return {"message": "AI returns empty response"}, 500
            question.answer = answer
            question.confidence = ai_response.confidence
            question.communication = ai_response.communication
            question.correctness = ai_response.correctness
            question.score = ai_response.score
            question.feedback = ai_response.feedback

            db.commit()

            return jsonify({"feedback": {ai_response.feedback}}), 200

    except Exception as e:
        return jsonify({"error": f"Failed to submit answer: {str(e)}"}), 500
    finally:
        db.close()

def finish_interview(interview_id):
    db = SessionLocal()
    try:
        interview = db.query(Interview).filter(Interview.id == interview_id).first()
        if not interview:
            return jsonify({"message": "Failed to find interview"}), 400
        total_questions = len(interview.questions)
        total_score = 0
        total_confidence = 0
        total_communication = 0
        total_correctness = 0
        for question in interview.questions:
            total_score += question.score or 0
            total_confidence += question.confidence or 0
            total_communication += question.communication or 0
            total_correctness += question.correctness or 0

        final_score = round(total_score / total_questions) if total_questions else 0
        avg_confidence = round(total_confidence / total_questions) if total_questions else 0
        avg_communication = round(total_communication / total_questions) if total_questions else 0
        avg_correctness = round(total_correctness / total_questions) if total_questions else 0
        interview.final_score = final_score
        interview.status = "Completed"
        db.commit()

        return jsonify({
            "final_score": final_score,
            "confidence": avg_confidence,
            "communication": avg_communication,
            "correctness": avg_correctness,
            "question_wise_score": [
                {
                    "question": q.question,
                    "score": q.score or 0,
                    "feedback": q.feedback or "",
                    "confidence": q.confidence or 0,
                    "communication": q.communication or 0,
                    "correctness": q.correctness or 0
                }
                for q in interview.questions
            ]
        }), 200

    except Exception as e:
        return jsonify({"error": f"Failed to get final score: {str(e)}"}), 500
    finally:
        db.close()