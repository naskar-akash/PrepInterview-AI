from sqlalchemy import Column, ForeignKey, Integer, String, Text, DateTime,Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship 
from ..db import Base

class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    question = Column(Text)
    difficulty = Column(String(50))
    timelimit = Column(Integer)
    answer = Column(Text)
    feedback = Column(Text)
    score = Column(Integer, default=0)
    confidence = Column(Integer, default=0)
    communication = Column(Integer, default=0)
    correctness = Column(Integer, default=0)
    interview_id = Column(Integer, ForeignKey("interview.id"), nullable=False)
    interview = relationship("Interview", back_populates="questions")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Interview(Base):
    __tablename__ = "interview"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    role = Column(String(255), nullable=False)
    experience = Column(Text, nullable=False)
    mode = Column(Enum("Technical", "HR", name="mode_enum"), nullable=False)
    resume_text = Column(Text)
    user = relationship("User", back_populates="interviews")
    questions = relationship("Question", back_populates="interview", cascade="all, delete-orphan")
    final_score = Column(Integer, default=0)
    status = Column(Enum("Incomplete", "Completed", name="status_enum"), default="Incomplete")
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
