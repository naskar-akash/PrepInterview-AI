from PyPDF2 import PdfReader
import re 

def extract_text_from_pdf(file_path):
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            extracted_text = page.extract_text()
            if extracted_text:
                text += extracted_text
            return text
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return None
    
def extract_resume_sections(file_path):
    text = extract_text_from_pdf(file_path)
    if not text:
        return {
            "skills": None,
            "education": None,
            "projects": None,
            "experience": None
        }
    skills = ""
    education = ""
    projects = ""
    experience = ""

    skills_match = re.search(r"Skills\s*(.*?)(Education|Projects|Experience|$)", text, re.DOTALL | re.IGNORECASE)
    education_match = re.search(r"Education\s*(.*?)(Skills|Projects|Experience|$)", text, re.DOTALL | re.IGNORECASE)
    projects_match = re.search(r"Projects\s*(.*?)(Skills|Education|Experience|$)", text, re.DOTALL | re.IGNORECASE)
    experience_match = re.search(r"Experience\s*(.*?)(Skills|Education|Projects|$)", text, re.DOTALL | re.IGNORECASE)

    if skills_match: skills = skills_match.group(1).strip()
    if education_match: education = education_match.group(1).strip()
    if projects_match: projects = projects_match.group(1).strip()
    if experience_match: experience = experience_match.group(1).strip()

    return {
        "skills": skills,
        "education": education,
        "projects": projects,
        "experience": experience
    }