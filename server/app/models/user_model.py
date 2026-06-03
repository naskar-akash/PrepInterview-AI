from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(250), unique=True, nullable=False)
    profile_pic = Column(Text, default="/static/images/default-avatar.png")
    credits = Column(Integer, default=100)
    resumes = relationship("Resume", back_populates="user")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

