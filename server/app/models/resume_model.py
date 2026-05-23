from sqlalchemy import Column, ForeignKey, Integer, Text, DateTime
from sqlalchemy.sql import func
from ..db import Base

class Resume(Base):
    __tablename__ = "resumes"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    extracted_skills = Column(Text)
    extracted_education = Column(Text)
    extracted_projects = Column(Text)
    extracted_experience = Column(Text)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
