from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..db import Base

class Payment(Base):
    __tablename__ = "payment"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    plan_id = Column(String(250))
    amount = Column(Integer)
    credits = Column(Integer)
    razorpay_order_id = Column(String(250))
    razorpay_payment_id = Column(String(250))
    status = Column(
        Enum("created", "paid", "failed", name="payment_status_enum"),
        default="created",
        nullable=False,
    )
    user = relationship("User", back_populates="payments")
    created_at = Column(DateTime(timezone=True), server_default=func.now())