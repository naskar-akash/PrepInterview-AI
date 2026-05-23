from sqlalchemy import Column, Integer, String, Enum, DateTime
from sqlalchemy.sql import func
from ..db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(200), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    age = Column(Integer)
    gender = Column(Enum("Male","Female","Other"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

