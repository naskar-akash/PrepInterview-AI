from sqlalchemy import Column, ForeignKey, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship 
from ..db import Base

class Resume(Base):
    __tablename__ = "resumes"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    resume_title = Column(String(255), nullable=False)
    filepath = Column(String(500), nullable=False)
    extracted_skills = Column(Text)
    extracted_education = Column(Text)
    extracted_projects = Column(Text)
    extracted_experience = Column(Text)
    user = relationship("User", back_populates="resumes")
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
