import time
from ..db import SessionLocal
from flask import jsonify
from ..models.payment_model import Payment
from ..services.razorpay_service import client
from ..models.user_model import User


def create_order(user_id, plan_id, amount, credits):
    db = SessionLocal()
    try:
        if not amount or not credits:
            return jsonify({"message": "Invalid plan data"}),400
        options = {
            "amount": amount*100,
            "currency": "INR",
            "receipt": f"receipt_{int(time.time())}"
        }
        order = client.order.create(options)   # Create Razorpay order
        payment = Payment(user_id=user_id,plan_id=plan_id,amount=amount,credits=credits,razorpay_order_id=order["id"],status="created")
        db.add(payment)
        db.commit()
        return jsonify({"success": True,"order": order}),200
    except Exception as e:
        return jsonify({"error":f"Error in creating razorpay order: {str(e)}"}),500
    finally:
        db.close()

def verify_payment(razorpay_order_id, razorpay_payment_id, razorpay_signature):
    db = SessionLocal()
    try:
        params_dict = {
            'razorpay_order_id': razorpay_order_id,
            'razorpay_payment_id': razorpay_payment_id,
            'razorpay_signature': razorpay_signature
        }
        client.utility.verify_payment_signature(params_dict)
        payment = db.query(Payment).filter(Payment.razorpay_order_id == razorpay_order_id).first()
        print(f"payment: {payment}")
        if payment is None:
            return jsonify({"message":"Payment not found"}),404

        payment.status = "paid"
        payment.razorpay_payment_id = razorpay_payment_id
        payment.razorpay_signature = razorpay_signature

        user = db.query(User).filter(User.id == payment.user_id).first()
        user.credits += payment.credits
        db.commit()

        return jsonify({
            "message":"Payment successful!", 
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "credits": user.credits
            }}),200
        
    except Exception as e:
        return jsonify({"error": f"Error in verifying razorpay payment: {str(e)}"}),500
    finally:
        db.close()